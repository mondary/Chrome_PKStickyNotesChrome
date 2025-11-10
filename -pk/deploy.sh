#!/bin/bash
HOST="ftp.cluster128.hosting.ovh.net"
USER="mondarl"
PASS="kJFQS29B6vn8"
REMOTE_DIR="/www/pk/pknotes"
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🚀 Déploiement FTP en cours..."
lftp -u "$USER","$PASS" "$HOST" <<EOF
set ssl:verify-certificate no
set ftp:passive-mode on

lcd "$LOCAL_DIR"
cd "$REMOTE_DIR"

# Mirror project files while keeping runtime data on the server
mirror -R . . \
  --exclude '.DS_Store' \
  --exclude-glob 'data/' \
  --exclude-glob '-pk/' \
  --exclude-glob '.*' # Exclude hidden files and directories

# Get the current date and time
UPLOAD_TIME=$(date +"%Y-%m-%d %H:%M:%S")

echo "✅ Déploiement terminé à $UPLOAD_TIME."

# Deployment completed successfully
echo "Deployment completed successfully"
