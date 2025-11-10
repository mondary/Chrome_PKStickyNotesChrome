# 🍳 Pkcuisto

Pkcuisto is a lightweight recipe locker with authentication, an admin console, and Gemini-powered extraction from any URL or free-text note. The stack stays 100 % PHP + vanilla Web Components so it can run on shared hosting without an external database.

## Features

- **Private recipe management**: create, edit, duplicate, or delete structured recipes with time, servings, tags, allergies, sources, notes, and media.
- **Gemini assistance**: paste a link or text, let Gemini draft the recipe schema, fine tune it in the form, then save.
- **Image suggestions**: search Wikimedia Commons thumbnails (fallback Unsplash) directement depuis le formulaire et applique-les en un clic.
- **Rich filters**: search by text, filter by tags, exclude allergens, and switch between grid or list layouts.
- **Pinned favourites**: étoile tes recettes pour les retrouver partout (état enregistré dans chaque `recipes_{userId}.json`).
- **User & admin tooling**: self-service email / password changes, account deletion, admin dashboard for password resets and inactive cleanup.
- **File-based storage**: each user owns a `backend/recipes_{id}.json` file; no SQL server required.
- **PWA ready**: service worker + manifest for installable/offline usage.

## Naming Conventions

- **Atoms** utilisent le préfixe `atom_` (`frontend/components/atom_button.js`, `atom_input.js`, ...).
- **Molecules** utilisent `mole_` ou `comp-status` / `comp_recipe_card` pour désigner les contrôles intermédiaires.
- **Organisms** gardent le préfixe `comp_` / `orga_` (`comp_recipes.js`, `comp_auth.js`, `orga_header.js`, etc.).
- Le shell de page est `frontend/components/comp-app.js`.
- Les helpers PHP restent dans `backend/`.
- Les jeux de données utilisateurs suivent le motif `recipes_{userId}.json`.

## Main Files & Folders

- `backend/api.php` – REST-style entry point (auth, recipes CRUD, Gemini import).
- `backend/recipes.php` – helpers for validation, normalisation, file IO.
- `backend/gemini.php` – Gemini client utilities.
- `backend/scripts/migrate_messages_to_recipes.php` – one-shot migrator from the legacy messages format.
- `frontend/components/atom_*.js` – primitives (buttons, inputs, search, icon buttons) stylables via variables CSS.
- `frontend/components/mole_*.js` / `comp-status.js` / `comp_recipe_card.js` – contrôles composés (toolbar, segmented control, toast, cartes recette).
- `frontend/components/comp_*.js` + `orga_header.js` – organisms couvrant auth, recettes, formulaire, admin, settings, header, extractor IA.
- `frontend/components/comp-app.js` – shell orchestrant auth/admin/recettes/settings.
- `frontend/assets/icon-*.svg` – PWA icons.
- `users.json` – account registry (auto-created).
- `recipes_{userId}.json` – per-user store (auto-created on registration).

## API Endpoints (backend/api.php)

All endpoints expect JSON bodies and session cookies.

### Auth & Profile

- `POST { action: "register", email, password }`
- `POST { action: "login", email, password }`
- `POST { action: "logout" }`
- `POST { action: "get_user" }`
- `POST { action: "change_email", new_email }`
- `POST { action: "change_password", new_password }`
- `POST { action: "delete_account" }`

### Admin (requires `is_admin`)

- `POST { action: "get_all_users" }`
- `POST { action: "reset_user_password", user_id }`
- `POST { action: "delete_user", user_id }`
- `POST { action: "delete_inactive_users", days_inactive }`

### Recipes (authenticated)

- `GET /backend/api.php` – list recipes with optional query params `q`, `tags`, `exclude_allergies`, `sort`, `order`.
- `POST { _method: "PUT", recipe }` – create recipe.
- `POST { _method: "PATCH", id, recipe }` – update partial recipe.
- `POST { _method: "DELETE", id }` – delete recipe by id.
- `POST { _method: "DELETE" }` – clear all recipes.
- `POST { action: "import_recipe", api_key, input, mode?, preprompt?, model? }` – call Gemini and return a draft.

## Gemini Integration

- La clé API Gemini est injectée côté serveur (`backend/config.php` ou `backend/config.local.php`) et n’est jamais exposée au navigateur.
- Chaque utilisateur synchronise son préprompt et son modèle préféré dans `recipes_{userId}.json > settings.ai` (avec cache local pour l’UX).
- Le backend exécute tous les appels (`call_gemini`) avec fallback de modèles ; les imports sont normalisés comme les saisies manuelles.

## Theming

Tous les atoms consomment désormais les variables CSS suivantes (définies par thème dans `frontend/themes/*.css`) :

- Boutons : `--button-bg-*`, `--button-text-*`, `--button-border-color`, `--button-border-radius`, `--button-disabled-opacity`…
- Icon buttons : `--icon-button-bg`, `--icon-button-hover-bg`, `--icon-button-color`, `--icon-button-danger-color`, etc.
- Inputs / Search : `--input-bg`, `--input-border-color`, `--input-text`, `--input-placeholder`, `--input-focus-border`, `--input-focus-ring`.

Adapter une palette consiste simplement à modifier ces variables dans le thème actif (`frontend/themes/mini.css`, `dark.css`, `modern.css`, `pk.css`).

## Usage

1. Deploy files (see `deploy.sh` / `deploy_init.sh`). Ensure PHP sessions and write access to `backend/`.
2. Visit `index.html`, register, and log in.
3. Optionally tune your Gemini pre-prompt/model in the “Extraction AI” panel (the server already holds the API key).
4. Import a recipe via URL or text, review the draft in the form, and save.
5. Manage entries via filters, edit, and delete actions. Admins can access `Admin Panel` from the header menu.

## PWA Notes

- `sw.js` caches the shell and component modules.
- `manifest.json` points to the SVG icons for install prompts.
- Increment `CACHE_NAME` in `sw.js` when assets change.

## Deployment Notes

- `deploy.sh` mirrors the workspace while skipping `recipes_*.json` to preserve live data.
- `deploy_init.sh` seeds the remote (also skips per-user datasets).
- Run `backend/scripts/migrate_messages_to_recipes.php` once if you still have legacy `data_*.json` files.
