## Qwen Added Memories
- Project requirements: 100% vanilla HTML, CSS, JS (Web Components) with Google Fonts and Font Awesome allowed. Structure: backend/ (PHP API), frontend/ (components, lang, themes), index.html at root. Backend/api.php handles JSON requests/responses with user management via PHP sessions. Frontend uses Web Components for auth, messages, settings. PWA with service worker and manifest. CSS with theme variables. Features: registration, login, logout, account deletion, message CRUD with isolation per user. Settings page with profile options.
- File organization: All PHP files should be located directly in the /backend/ directory (no nested lib/ folder). All CSS files should be located in the /frontend/themes/ directory.

## Comment je travaille

1.  **Comprendre :** Je commence par analyser en profondeur la demande de l'utilisateur et la base de code pertinente. J'utilise `search_file_content`, `glob`, `read_file` et `read_many_files` pour appréhender les structures de fichiers, les modèles de code et les conventions de projet.
2.  **Planifier :** Je formule un plan cohérent basé sur ma compréhension, incluant souvent un processus de développement itératif avec des tests unitaires. Je peux partager un plan concis avec l'utilisateur pour plus de clarté.
3.  **Implémenter :** J'utilise des outils comme `replace`, `write_file` et `run_shell_command` pour exécuter le plan, en adhérant strictement aux conventions du projet.
4.  **Vérifier (Tests) :** Je vérifie les modifications à l'aide des procédures de test de projet existantes, en identifiant et en exécutant les commandes de test appropriées.
5.  **Vérifier (Normes) :** J'exécute les commandes de construction, de linting et de vérification de type spécifiques au projet pour garantir la qualité du code et le respect des normes.
6.  **Finaliser :** Une fois la vérification réussie, la tâche est considérée comme terminée. Je ne supprime ni n'annule les modifications, sauf instruction contraire.

## Prérequis architecturaux et techniques

Mon objectif principal est de m'intégrer de manière transparente aux architectures et technologies de projet existantes. Cependant, lorsque la flexibilité m'est accordée ou lors du démarrage de nouveaux composants, j'adhère généralement aux principes et préférences suivants :

*   **Structure du répertoire racine :** Je privilégie une structure de répertoire racine minimale, contenant idéalement uniquement un fichier `index.html` et deux dossiers principaux : `/frontend` et `/backend`. Au sein du dossier `/frontend`, j'organise généralement les fichiers dans les sous-répertoires suivants : `/comp` (pour les composants), `/font` (pour les polices), `/lang` (pour les fichiers de langue) et `/pict` (pour les images et pictogrammes).
*   **Conventions de nommage :** Pour une meilleure organisation et clarté, les fichiers de composants JavaScript commencent toujours par `comp_` (par exemple, `comp_bouton.js`), les fichiers JavaScript représentant des pages (qui appellent ces composants) commencent toujours par `page_` (par exemple, `page_accueil.js`), et les fichiers de pictogrammes (icônes) commencent toujours par `pic_` (par exemple, `pic_icone_maison.svg`).
*   **JavaScript/TypeScript Vanilla :** Je préfère travailler avec JavaScript ou TypeScript vanilla lorsque cela est possible, en minimisant la dépendance aux bibliothèques ou frameworks externes, sauf s'ils sont déjà établis dans le projet. Cette approche favorise un code léger, performant et maintenable.
*   **Modularité :** Je privilégie les structures de code modulaires, en décomposant les fonctionnalités en composants ou fonctions petits et réutilisables.
*   **Lisibilité et maintenabilité :** Le code doit être propre, bien structuré et facile à comprendre. Je privilégie les conventions de nommage claires et un flux logique.
*   **Performance :** Je m'efforce d'écrire un code efficace qui tient compte des implications en matière de performances, en particulier dans les contextes web.
*   **Sécurité :** Toutes les modifications de code sont effectuées en tenant compte des meilleures pratiques de sécurité, évitant l'introduction de vulnérabilités.
*   **Tests :** Je préconise des tests complets pour garantir la fiabilité et l'exactitude du code.
*   **Conventions existantes :** Par-dessus tout, je privilégierai et respecterai toujours les conventions, les guides de style et les modèles architecturaux existants déjà présents dans le projet sur lequel je travaille. Mes préférences sont secondaires par rapport aux normes de projet établies.
*   **Ressources externes :** Je peux utiliser des ressources externes telles que Google Fonts ou Font Awesome pour améliorer l'esthétique ou la fonctionnalité, à condition qu'elles soient conformes aux licences et aux conventions du projet.
