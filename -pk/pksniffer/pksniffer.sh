#!/bin/bash

# Démarre le serveur PHP, ouvre l'index de la racine et injecte PK Sniffer.
# L'arrêt (Ctrl+C) restaure automatiquement l'index et coupe le serveur.

set -euo pipefail

PORT=8000
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR"
INDEX_FILE="$ROOT_DIR/index.html"
BACKUP_FILE="$ROOT_DIR/index.html.pksniffer.bak"
PID_FILE="$ROOT_DIR/.pksniffer.pid"
INJECT_PLACEHOLDER="<!-- SNIFFER_INJECT -->"
INJECT_SNIPPET="$(cat <<'EOF'
    <link rel="stylesheet" href="-pksniffer/sniffer.css">
    <script src="-pksniffer/sniffer.js"></script>
EOF
)"

PHP_PID=""

cleanup() {
    local exit_status=$?
    set +e

    if [[ -n "$PHP_PID" ]] && ps -p "$PHP_PID" > /dev/null 2>&1; then
        echo "Arrêt du serveur PHP (PID $PHP_PID)..."
        kill "$PHP_PID"
    fi

    [[ -f "$PID_FILE" ]] && rm -f "$PID_FILE"

    if [[ -f "$BACKUP_FILE" ]]; then
        echo "Restauration de l'index d'origine..."
        mv "$BACKUP_FILE" "$INDEX_FILE"
    fi

    set -e
    exit $exit_status
}

trap cleanup EXIT INT TERM

ensure_index_ready() {
    if [[ ! -f "$INDEX_FILE" ]]; then
        echo "Fichier $INDEX_FILE introuvable."
        exit 1
    fi

    if [[ -f "$BACKUP_FILE" ]]; then
        echo "Sauvegarde précédente détectée, restauration avant nouvelle injection..."
        mv "$BACKUP_FILE" "$INDEX_FILE"
    fi
}

inject_sniffer() {
    if grep -qF "$INJECT_SNIPPET" "$INDEX_FILE"; then
        echo "PK Sniffer déjà injecté, aucune action."
        return
    fi

    echo "Injection de PK Sniffer dans index.html..."
    cp "$INDEX_FILE" "$BACKUP_FILE"

    export INJECT_SNIPPET
    export INJECT_PLACEHOLDER
    python3 - "$INDEX_FILE" <<'PY'
import os
import sys

path = sys.argv[1]
snippet = os.environ["INJECT_SNIPPET"]
placeholder = os.environ["INJECT_PLACEHOLDER"]

with open(path, encoding="utf-8") as fh:
    content = fh.read()

if placeholder in content:
    content = content.replace(placeholder, snippet, 1)
else:
    content = content.replace("</body>", f"{snippet}\n</body>", 1)

with open(path, "w", encoding="utf-8") as fh:
    fh.write(content)
PY
}

start_server() {
    if [[ -f "$PID_FILE" ]]; then
        local existing_pid
        existing_pid=$(cat "$PID_FILE")
        if ps -p "$existing_pid" > /dev/null 2>&1; then
            echo "Un serveur semble déjà tourner (PID $existing_pid). Arrêtez-le avant de relancer."
            exit 1
        fi
        rm -f "$PID_FILE"
    fi

    echo "Démarrage du serveur PHP sur http://localhost:$PORT ..."
    php -S "localhost:$PORT" -t "$ROOT_DIR" >/dev/null 2>&1 &
    PHP_PID=$!
    echo "$PHP_PID" > "$PID_FILE"
    echo "Serveur démarré (PID $PHP_PID)."
}

ensure_index_ready
inject_sniffer
start_server

sleep 1
echo "Ouverture de http://localhost:$PORT dans le navigateur par défaut..."
open "http://localhost:$PORT"

echo "PK Sniffer opérationnel. Appuyez sur Ctrl+C pour tout arrêter."

wait "$PHP_PID"
