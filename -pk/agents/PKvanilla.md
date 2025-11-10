# 🧱 Architecture Frontend — Base Web Components + Web Awesome

## 🎯 Objectif

Fournir une **base de composants Web complète et indépendante du style**, permettant :
- une **personnalisation totale du design** pour chaque client via *thèmes CSS* ;
- la **création de nouveaux composants** si nécessaire (logique et présentation séparées) ;
- une **absence totale de compilation** (zéro build, 100 % natif navigateur).


## ⚙️ Stack technique

- **Web Components** (natifs, sans framework)
- **[Web Awesome](https://webawesome.com/)** — bibliothèque de composants UI basée sur Web Components
- **Design Tokens CSS** — variables CSS partagées pour couleurs, espacements, polices, etc.
- **Vanilla JavaScript (ES Modules)** — logique métier simple et portable
- **Aucune compilation** : tout tourne directement dans le navigateur via `<script type="module">`



## 🗂️ Structure du projet
frontend/
│
├── index.html                  # Entrée principale
├── app.js                      # Logique principale (initialisation, routing, etc.)
│
├── components/                 # Composants personnalisés
│   ├── comp_app.js
│   ├── comp_header.js
│   ├── comp_message.js
│   └── ...
│
├── themes/                     # Thèmes personnalisables par client
│   ├── default.css             # Thème de base
│   ├── client_alpha.css        # Thème client A
│   ├── client_beta.css         # Thème client B
│   └── ...
│
└── assets/
├── logos/
└── icons/


## 🎨 Système de thèmes (Design Tokens)

Chaque thème définit un ensemble commun de variables CSS.

### Exemple — `themes/default.css`
css
:root {
  --color-primary: #0066ff;
  --color-surface: #ffffff;
  --color-text: #222;
  --radius: 8px;
  --font-family: 'Inter', sans-serif;
  --shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}


### Exemple — `themes/client_beta.css`

css
:root {
  --color-primary: #ff006e;
  --color-surface: #fef8f9;
  --color-text: #111;
  --radius: 12px;
  --font-family: 'Poppins', sans-serif;
  --shadow: 0 2px 8px rgba(255, 0, 110, 0.2);
}


## 🌈 Application d’un thème

Le thème est chargé dynamiquement depuis `app.js` :

js
async function loadTheme(name = 'default') {
  const link = document.getElementById('theme');
  link.href = `themes/${name}.css`;
}

// Exemple : thème choisi selon utilisateur
const userTheme = localStorage.getItem('theme') || 'client_beta';
loadTheme(userTheme);


Dans `index.html` :

html
<link id="theme" rel="stylesheet" href="themes/default.css">


## 🧩 Utilisation de Web Awesome

Ajoute Web Awesome en CDN :

html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist-cdn/styles/themes/default.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist-cdn/webawesome.loader.js"></script>


Puis importe les composants dont tu as besoin :

js
import 'https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist-cdn/components/button/button.js';
import 'https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist-cdn/components/input/input.js';
import 'https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist-cdn/components/dialog/dialog.js';


### Exemple HTML

html
<wa-button variant="brand">Valider</wa-button>
<wa-input label="Adresse email"></wa-input>
<wa-dialog label="Message">Bienvenue dans le système !</wa-dialog>


## 🧱 Création de composants personnalisés

Les composants personnalisés sont développés en **Web Components natifs**.

### Exemple — `components/comp_message.js`

js
export class CompMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--color-surface);
          color: var(--color-text);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 1rem;
        }
      </style>
      <slot></slot>
    `;
  }
}
customElements.define('comp-message', CompMessage);

Chaque composant hérite automatiquement du thème actif grâce aux variables CSS globales.

---

## 💡 Thématisation multi-clients

Chaque client a son fichier CSS de thème.

Changement de thème dynamique :

js
function setTheme(clientName) {
  document.documentElement.setAttribute('data-theme', clientName);
  document.getElementById('theme').href = `themes/${clientName}.css`;
  localStorage.setItem('theme', clientName);
}


Interface de sélection possible :

html
<select onchange="setTheme(this.value)">
  <option value="default">Default</option>
  <option value="client_alpha">Client Alpha</option>
  <option value="client_beta">Client Beta</option>
</select>


## 🧠 Bonnes pratiques

* **Ne jamais coder de couleurs ou polices en dur** dans les composants.
  Utiliser uniquement les variables CSS (`--color-primary`, `--font-family`, etc.)
* **Toujours préfixer** tes variables par `--app-` ou `--theme-` pour éviter les conflits.
* **Créer de nouveaux composants** en suivant la nomenclature `comp_*.js`.
* **Tester les thèmes indépendamment** : un thème doit pouvoir être modifié sans casser la structure.
* **Centraliser les tokens** (espacements, radius, etc.) pour garantir la cohérence visuelle.

---

## 🚀 Avantages de cette architecture

✅ Zéro compilation — fonctionne directement sur serveur PHP ou statique
✅ Théming instantané et centralisé
✅ Composants réutilisables et extensibles
✅ Séparation claire entre logique, structure et style
✅ Intégration facile avec backend existant (API PHP)

---

## 📁 Exemple de hiérarchie complète


project-root/
├── backend/
│   └── api.php
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── components/
│   │   ├── comp_app.js
│   │   ├── comp_header.js
│   │   └── comp_message.js
│   ├── themes/
│   │   ├── default.css
│   │   ├── client_alpha.css
│   │   └── client_beta.css
│   └── assets/
│       └── logos/
└── users.json


---

## 🧾 Résumé

Ce socle permet de :

* développer des interfaces modulaires, légères et maintenables ;
* livrer à chaque client une interface visuellement unique ;
* évoluer sans jamais dépendre d’un système de build.

C’est une approche **artisanale, moderne et pérenne** du front-end.

---

## 👷 À faire pour démarrer

1. Créer les répertoires `components/` et `themes/`.
2. Ajouter `index.html` avec le lien vers le thème par défaut.
3. Importer Web Awesome via CDN.
4. Créer ton premier composant `comp_app.js`.
5. Ajouter un second thème `client_alpha.css` pour tester le système de theming.
6. Documenter les variables CSS autorisées pour les thèmes (ton design token set).

---
