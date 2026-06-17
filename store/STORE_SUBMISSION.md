# Formulaire de soumission Chrome Web Store - PK Sticky Notes Chrome

## 1. Objectif unique de l'extension (max 1000 caractères)

PK Sticky Notes Chrome permet aux utilisateurs d'ajouter et de gérer des notes personnelles directement sur n'importe quelle page web. Les utilisateurs peuvent créer des notes contextuelles via un clic droit, les déplacer et les redimensionner librement, et les retrouver automatiquement lors de leurs prochaines visites. L'extension stocke toutes les notes localement dans le navigateur de l'utilisateur.

---

## 2. Justification des autorisations

### 📦 storage (max 1000 caractères)

L'autorisation "storage" est essentielle pour sauvegarder les notes créées par l'utilisateur. Chaque note contient son contenu, sa position, ses dimensions et sa couleur. Cette autorisation permet à l'extension de conserver les notes entre les sessions de navigation, garantissant que les notes créées sur une page spécifique soient toujours disponibles lors des visites ultérieures. Sans cette autorisation, toutes les notes seraient perdues à la fermeture du navigateur.

### 🎯 activeTab (max 1000 caractères)

L'autorisation "activeTab" permet à l'extension d'injecter des scripts de contenu uniquement dans l'onglet actuellement actif lorsqu'une interaction utilisateur se produit (clic droit pour créer une note). Cette autorisation est nécessaire pour afficher l'interface de notes sur la page web active, permettre le déplacement et le redimensionnement des notes, et interagir avec le DOM de la page pour positionner les notes correctement. L'extension n'accède aux onglets que lors d'actions explicites de l'utilisateur.

### 📑 tabs (max 1000 caractères)

L'autorisation "tabs" est utilisée pour identifier l'URL de la page active afin d'associer correctement les notes à leur page d'origine. Lorsqu'un utilisateur visite une page, l'extension doit vérifier si des notes existent déjà pour cette URL spécifique et les restaurer. Cette autorisation permet également à l'extension de détecter les changements d'onglets et de mises à jour de page pour afficher ou masquer les notes appropriées.

### 🖱️ contextMenus (max 1000 caractères)

L'autorisation "contextMenus" est utilisée pour créer un élément de menu contextuel "Créer une note" qui apparaît lorsqu'un utilisateur effectue un clic droit sur n'importe quelle page web. Cette fonctionnalité est le moyen principal d'interaction avec l'extension et permet aux utilisateurs de créer des notes rapidement sans quitter leur flux de travail. Le menu contextuel est le point d'entrée principal pour la fonctionnalité de création de notes.

### 🌐 Autorisation d'accès à l'hôte (max 1000 caractères)

L'autorisation d'accès à l'hôte `<all_urls>` dans les scripts de contenu est nécessaire pour que l'extension fonctionne sur tous les sites web que les utilisateurs visitent. Les scripts de contenu injectent le HTML, le CSS et le JavaScript nécessaires pour afficher et gérer les notes sur chaque page. Sans cette autorisation, l'extension ne pourrait fonctionner que sur un nombre limité de sites prédéfinis, ce qui rendrait l'outil inutilisable pour la plupart des besoins de navigation des utilisateurs.

---

## 3. Code distant

**Réponse : Non, je n'utilise pas "Code distant"**

L'extension n'utilise aucun code JavaScript ou WebAssembly externe. Tout le code est inclus dans le package de l'extension (fichiers JS, CSS, HTML locaux). Aucune référence à des scripts externes, aucune évaluation dynamique de code, ni aucun chargement de ressources distantes.

---

## 4. Consommation des données

### Types de données collectées :

✅ **Contenu du site Web** : L'extension stocke le contenu textuel des notes créées par l'utilisateur, ainsi que les URLs des pages sur lesquelles les notes sont créées.

❌ **Informations permettant d'identifier personnellement l'utilisateur** : Non
❌ **Information sur la santé** : Non  
❌ **Informations financières et de paiement** : Non
❌ **Informations d'authentification** : Non
❌ **Communications personnelles** : Non
❌ **Localisation** : Non
❌ **Historique Web** : Non (seules les URLs avec notes actives sont stockées)
❌ **Activité de l'utilisateur** : Non (pas de tracking de clics, souris, clavier)

---

## 5. Certifications obligatoires

✅ **Je ne vends ni ne transfère les données des utilisateurs à des tiers en dehors des cas d'utilisation approuvés**

✅ **Je n'utilise ni ne transfère les données des utilisateurs à des fins sans rapport avec la fonctionnalité de base de mon article**

✅ **Je n'utilise ni ne transfère les données des utilisateurs pour déterminer leur solvabilité ou à des fins de prêt**

---

## 6. Règles de confidentialité

**Option 1 : Créer une page de confidentialité**

```
https://mondary.design/privacy-policy-pk-sticky-notes-chrome
```

**Option 2 : Utiliser une page existante**

Si vous n'avez pas encore de page de confidentialité, vous pouvez créer un fichier simple et l'héberger sur GitHub Pages ou votre site existant.

---

## Contenu suggéré pour la page de confidentialité :

```markdown
# Politique de confidentialité - PK Sticky Notes Chrome

## Collecte des données

PK Sticky Notes Chrome collecte uniquement les données strictement nécessaires au fonctionnement de l'extension :

- **Contenu des notes** : Le texte que vous saisissez dans vos notes
- **Métadonnées des notes** : Position, taille, couleur de vos notes
- **URLs des pages** : Adresse des pages web sur lesquelles vous avez créé des notes

## Stockage des données

Toutes les données sont stockées localement sur votre appareil via l'API de stockage de Chrome (chrome.storage.local). Aucune donnée n'est envoyée à des serveurs externes.

## Partage des données

Nous ne vendons, ne partageons ni ne transférons vos données à des tiers. Vos notes restent privées et ne quittent jamais votre navigateur.

## Accès et suppression

Vous pouvez accéder à vos notes via l'interface de l'extension. Pour supprimer vos données, désinstallez simplement l'extension ou utilisez l'option de suppression dans les paramètres de l'extension.

## Cookies et tracking

PK Sticky Notes Chrome n'utilise pas de cookies, ni de technologies de suivi. Aucune donnée analytique n'est collectée.

## Modifications de cette politique

Nous nous réservons le droit de modifier cette politique de confidentialité. Les modifications seront publiées sur cette page.

## Contact

Pour toute question concernant votre confidentialité : contact@mondary.design
```

---

## Résumé rapide pour copier-coller

### Objectif unique :
PK Sticky Notes Chrome permet d'ajouter et gérer des notes personnelles sur n'importe quelle page web via clic droit, avec sauvegarde locale automatique.

### Storage : Sauvegarder les notes entre sessions
### ActiveTab : Afficher les notes sur la page active lors d'interactions utilisateur
### Tabs : Identifier l'URL pour associer les notes à leur page d'origine
### ContextMenus : Créer le menu "Créer une note" au clic droit
### Host : Injecter les scripts de contenu sur tous les sites web

### Code distant : Non

### Données : Contenu du site Web (notes et URLs)

### Certifications : Toutes cochées

### Confidentialité : URL à fournir