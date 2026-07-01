# PK Sticky Notes

![Project icon](icon.png)

[🇬🇧 EN](README_en.md) · [🇫🇷 FR](README.md)

✨ Ajoutez des notes collantes directement sur vos pages web. Made by PK-Labs.

## 🎯 Aperçu

**PK Sticky Notes Chrome** est une extension Chrome qui vous permet d'ajouter des notes personnelles et colorées directement sur n'importe quelle page web. Vos idées, rappels et annotations restent exactement où vous en avez besoin !

## ✨ Fonctionnalités

### 📝 Gestion des Notes
- **Notes Instantanées** : Créez des notes en un clic droit sur n'importe quelle page
- **Notes Persistantes** : Vos notes sont sauvegardées automatiquement et restent attachées à leurs pages
- **Personnalisation** : Choisissez parmi différentes couleurs pour organiser vos notes
- **Interface Intuitive** : Déplacez et redimensionnez vos notes librement

### 🎨 Expérience Utilisateur
- **Menu Contextuel** : Accès rapide via clic droit
- **Interface Épurée** : Design minimaliste qui ne gêne pas votre navigation
- **Stockage Local** : Toutes vos données restent sur votre appareil, aucune connexion cloud

### 🔧 Configuration
- **Page d'Options** : Personnalisez l'extension selon vos besoins
- **Paramètres Accessibles** : Modifiez facilement les réglages via le panneau de configuration

## 🚀 Installation

### Depuis le Chrome Web Store
1. Visitez le [Chrome Web Store](https://chrome.google.com/webstore/detail/pk-sticky-notes-chrome) 
2. Cliquez sur "Ajouter à Chrome"
3. L'extension s'installera automatiquement

### En Mode Développement
1. Ouvrez Chrome et allez sur `chrome://extensions/`
2. Activez le **Mode développeur** en haut à droite
3. Cliquez sur **Charger l'extension non empaquetée**
4. Sélectionnez le dossier `src` de ce projet

## 📖 Utilisation

### Créer une Note
1. **Clic Droit** : Faites un clic droit n'importe où sur une page web
2. **Sélectionnez** : Choisissez "Créer une note" dans le menu contextuel
3. **Écrivez** : Tapez votre contenu dans la note qui apparaît

### Gérer vos Notes
- **Déplacer** : Cliquez et glissez la note pour la repositionner
- **Redimensionner** : Tirez les bords de la note pour changer sa taille
- **Supprimer** : Utilisez le bouton de suppression sur chaque note
- **Changer la Couleur** : Sélectionnez parmi les couleurs disponibles

## 🎯 Cas d'Usage

### 📚 Recherche et Apprentissage
- Annotez des articles en ligne avec vos pensées
- Marquez des passages importants dans des documents
- Créez des rappels contextuels sur des ressources

### 💼 Travail et Productivité
- Prenez des notes pendant des réunions en ligne
- Organisez vos idées directement sur les pages de projet
- Gardez une trace de vos réflexions pendant le travail

### 🛒 Shopping et Comparaison
- Notez les caractéristiques importantes des produits
- Comparez les options avec des notes sur différentes pages
- Créez des listes pros/cons directement sur les pages produits

### 📰 Veille Informationnelle
- Commentez des articles avec vos analyses
- Marquez des informations clés dans des rapports
- Gardez une trace de vos réflexions sur les blogs

## 🔒 Confidentialité

PK Sticky Notes Chrome respecte votre vie privée :

- ✅ **Stockage Local** : Toutes vos données sont stockées localement dans Chrome
- ✅ **Aucune Connexion Internet** : L'extension fonctionne entièrement hors ligne
- ✅ **Pas de Tracking** : Aucune collecte de données d'utilisation
- ✅ **Pas de Serveurs Externes** : Vos notes ne quittent jamais votre navigateur

Pour plus de détails, consultez notre [Politique de Confidentialité](https://mondary.github.io/Chrome_PKStickyNotesChrome/store/privacy-policy-pk-sticky-notes-chrome.html).

## 🛠️ Développement

### Structure du Projet
```
PKStickyNotesChrome/
├── src/                    # Code source de l'extension
│   ├── manifest.json      # Configuration de l'extension
│   ├── content.js         # Scripts de contenu pour les notes
│   ├── background.js      # Service worker pour la gestion
│   ├── options.html       # Page de configuration
│   ├── options.js         # Script de la page options
│   └── styles.css         # Styles CSS des notes
├── store/                  # Assets pour le Chrome Web Store
│   ├── PKstickyNotes_v1.0.1.zip  # Package pour publication
│   └── *.png              # Images et screenshots
└── README.md              # Documentation (ce fichier)
```

### Technologies Utilisées
- **HTML5/CSS3** : Interface utilisateur
- **JavaScript (ES6+)** : Logique de l'extension
- **Chrome Extension API v3** : APIs natives de Chrome
- **Chrome Storage API** : Persistance des données

## 🧾 Changelog

### Version 1.0.3
- 🎨 Mise à jour branding PK-Labs, noms cohérents et descriptions optimisées
- 🌐 Ajout lien vers mondary.design dans les descriptions

### Version 1.0.1
- 📝 Mise à jour du README
- 🎨 Amélioration de l'interface
- 🔧 Optimisations des performances

### Version 1.0.0
- 🎉 Version initiale
- ✨ Fonctionnalités de base des notes
- 📦 Première publication

## 🔗 Liens Utiles

- **Chrome Web Store** : [PK Sticky Notes](https://chrome.google.com/webstore/detail/pk-sticky-notes-chrome)
- **Politique de Confidentialité** : [GitHub Pages](https://mondary.github.io/Chrome_PKStickyNotesChrome/store/privacy-policy-pk-sticky-notes-chrome.html)
- **Site** : [mondary.design](https://mondary.design)
- **Description** : [store/DESCRIPTION.md](store/DESCRIPTION.md)

## 📝 Licence

Ce projet est développé et maintenu par [cmondary](https://mondary.design).

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des nouvelles fonctionnalités  
- Améliorer la documentation
- Soumettre des pull requests

## 📧 Contact

Pour toute question ou suggestion : [contact@mondary.design](mailto:contact@mondary.design)

---

**Développé avec ❤️ par [cmondary](https://mondary.design)**
