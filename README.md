# ✈️ Boss Final Voyage

Application de réservation de voyages développée avec **Angular 20+** et les dernières fonctionnalités du framework. Ce projet illustre les meilleures pratiques Angular modernes avec une architecture standalone, des Signals, et une gestion d'état réactive.

![Angular](https://img.shields.io/badge/Angular-20.3-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## ✨ Fonctionnalités

- 📋 **Formulaire de réservation multi-sections** : Informations personnelles, type de voyage, détails du vol, passagers additionnels, options
- ✅ **Validations avancées** : Validations natives et personnalisées avec feedback en temps réel
- 💾 **Persistance locale** : Sauvegarde automatique des réservations dans localStorage
- 📱 **Interface responsive** : Design adaptatif avec TailwindCSS
- 🔔 **Notifications toast** : Retours visuels pour les actions utilisateur
- 🎯 **Gestion d'état réactive** : Utilisation des Signals Angular

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ et npm
- Angular CLI 20+

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd boss-final-voyage

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

L'application sera accessible sur **http://localhost:4200**

## 📁 Structure du projet

```
src/app/
├── features/
│   └── booking/
│       ├── booking-form/          # Formulaire principal
│       │   ├── booking-form.ts
│       │   └── components/        # Sous-composants du formulaire
│       │       ├── personal-info.ts
│       │       ├── travel-type.ts
│       │       ├── flight-info.ts
│       │       ├── additional-passenger.ts
│       │       └── flight-options.ts
│       ├── booking-list/          # Liste des réservations
│       ├── booking-item/          # Item de réservation
│       ├── models/                # Modèles de données
│       └── services/              # Services métier
└── shared/
    ├── cards/                     # Composants card réutilisables
    └── toast/                     # Système de notifications
```

## 🎯 Bonnes pratiques Angular 20+

Ce projet met en œuvre les dernières recommandations Angular :

### Architecture moderne

- ✅ **Standalone components** - Plus de NgModules
- ✅ **Signals** - Gestion d'état réactive et performante
- ✅ **inject()** - Injection de dépendances moderne
- ✅ **OnPush change detection** - Optimisation des performances

### Syntaxe moderne

- ✅ **@if/@for/@switch** - Nouvelle syntaxe de contrôle de flux
- ✅ **input()/output()** - Déclaration moderne des propriétés
- ✅ **effect()** - Effets réactifs pour les Signals

### Formulaires

- ✅ **Reactive Forms** - Formulaires typés et réactifs
- ✅ **Validations personnalisées** - Validateurs métier
- ✅ **valueChanges avec Signals** - Réactivité optimale

## 🛠️ Technologies utilisées

- **Angular 20.3** - Framework frontend
- **TypeScript 5.9** - Langage de programmation
- **TailwindCSS 4.1** - Framework CSS utility-first
- **RxJS 7.8** - Programmation réactive
- **Karma + Jasmine** - Tests unitaires

## 📦 Scripts disponibles

```bash
# Démarrage en mode développement
npm start

# Build de production
npm run build

# Build en mode watch
npm run watch

# Lancer les tests
npm test
```

## 🌐 Déploiement sur StackBlitz

### Option 1 : Via GitHub

Pushez votre code sur GitHub puis ouvrez :

```
https://stackblitz.com/github/votre-username/boss-final-voyage
```

### Option 2 : Import direct

1. Allez sur [stackblitz.com](https://stackblitz.com)
2. Cliquez sur "Import project"
3. Sélectionnez votre repository GitHub

## 🎓 Points d'apprentissage

Ce projet est conçu pour illustrer :

- L'architecture **feature-based** d'une application Angular
- L'utilisation des **Signals** pour la gestion d'état
- La création de **formulaires complexes** avec validations
- L'intégration de **TailwindCSS** dans Angular
- Les patterns de **communication parent-enfant** avec Signals
- La **persistance de données** côté client

## 📝 Notes

Ce projet privilégie la **clarté** et les **bonnes pratiques** plutôt que la complexité. Pour une application de production, considérez l'ajout de :

- Tests unitaires et E2E complets
- State management global (NgRx, Signal Store)
- Connexion à une API backend
- Internationalisation (i18n)
- Gestion des erreurs avancée
- Optimisation du bundle

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

Développé avec ❤️ en utilisant Angular 20
