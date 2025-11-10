# CRUSH.md - Pkcuisto Recipe App

## Build & Deploy Commands

- **Deploy**: `./deploy.sh` - Secure FTP deployment (skips user data)
- **Initial Deploy**: `./deploy_init.sh` - Full deployment including backend structure
- **Test**: No test framework configured - manual testing via browser

## Code Style Guidelines

### PHP Backend
- Use `declare(strict_types=1)` in all files
- Type declarations required for function parameters and returns
- File locking with `flock()` for concurrent access to JSON files
- Proper error handling with `RuntimeException` and HTTP status codes
- JSON encoding with `JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE`

### JavaScript Frontend
- Préfixes par niveau : `atom_*` (atoms), `mole_*` / `comp-status` (molecules), `comp_*` / `orga_*` (organisms), `comp-app.js` (page shell).
- Tous les composants résident dans `frontend/components/` ; le niveau est déterminé par le nom du fichier.
- ES6 classes étendant `HTMLElement` + Shadow DOM.
- Architecture orientée événements (CustomEvent).

### File Structure
- Backend helpers in `backend/lib/` (auto-created)
- User data files follow `recipes_{userId}.json` pattern
- Atomic front-end via préfixes : tous les composants dans `frontend/components/`
- No build process - direct file deployment

### Naming Conventions
- PHP: snake_case for functions/variables
- JS: camelCase for methods/properties, PascalCase for classes
- Constants: UPPER_SNAKE_CASE
- User IDs: `uniqid()` generated
- Recipe IDs: `rcp_` prefix + unique ID

### Error Handling
- PHP: HTTP status codes + JSON error responses
- JS: Toast notifications for user feedback
- File operations: try-catch with proper resource cleanup
- Session validation on all protected endpoints

### Data Validation
- PHP: type checking and sanitization for all inputs
- JS: trim() and validation for form fields
- Recipe normalization via `normalise_recipe()` function
- Email validation with `filter_var(FILTER_VALIDATE_EMAIL)`

### PWA & Service Worker
- Increment `CACHE_NAME` in `sw.js` when assets change
- Service worker caches shell and component modules
- Manifest uses SVG icons for install prompts
