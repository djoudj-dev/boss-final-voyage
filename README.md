# ✈️ Boss Final Voyage

**Projet final du module "Maîtriser les formulaires en ReactiveForms"** - Application de réservation de voyages développée avec **Angular 20+** qui met en pratique l'ensemble des concepts avancés des formulaires réactifs Angular.

Ce projet représente l'aboutissement d'un parcours d'apprentissage progressif sur les **ReactiveForms**, couvrant des validations simples aux patterns avancés de gestion d'état et de validation personnalisée.

![Angular](https://img.shields.io/badge/Angular-20.3-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge)

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

## 📦 Scripts disponibles

```bash
# Démarrage en mode développement
npm start

# Build de production
npm run build

# Build en mode watch
npm run watch

```

## 📚 Parcours d'apprentissage

Ce projet représente le **boss final** d'un module de formation progressif sur les **ReactiveForms Angular**. Voici le parcours suivi pour arriver à ce projet :

### Leçon 1 : Ces champs sont obligatoires !
**Concepts clés** : `FormControl`, `FormGroup`, `Validators.required`, formulaires imbriqués

Apprentissage des fondamentaux des formulaires réactifs avec création de formulaires typés et utilisation des validateurs natifs. Introduction aux `FormGroup` imbriqués pour structurer des formulaires complexes.

### Leçon 2 : Ce champ est (in)actif selon le choix de l'utilisateur
**Concepts clés** : `enable()`, `disable()`, `statusChanges`, `valueChanges`, `toSignal()`, `effect()`

Maîtrise de l'activation/désactivation dynamique des contrôles selon le contexte. Introduction à la réactivité avec les **Observables** transformés en **Signals** et utilisation d'`effect()` pour réagir aux changements.

### Leçon 3 : Les built-in validators
**Concepts clés** : `min`, `max`, `minLength`, `maxLength`, `pattern`, `email`, validation conditionnelle

Exploration des validateurs natifs Angular et apprentissage de la gestion dynamique des validateurs avec `setValidators()`, `clearValidators()`, et `updateValueAndValidity()`.

### Leçon 4 : Custom validators
**Concepts clés** : `ValidatorFn`, `ValidationErrors`, validateurs sur `FormGroup`, logique métier

Création de validateurs personnalisés pour répondre à des besoins métier spécifiques. Compréhension de la différence entre validateurs sur `FormControl` et sur `FormGroup`.

### Leçon 5 : Réinitialiser un formulaire
**Concepts clés** : `reset()`, `pristine`, `dirty`, `touched`, `untouched`, `nonNullable`

Gestion du cycle de vie des formulaires avec réinitialisation et suivi des états d'interaction utilisateur. Utilisation de `nonNullable` pour éviter les valeurs `null`.

### Leçon 6 : Modifier les valeurs d'un formulaire
**Concepts clés** : `setValue()`, `patchValue()`, copie de données, désactivation conditionnelle

Maîtrise de la modification programmatique des formulaires avec compréhension des différences entre `setValue()` (strict) et `patchValue()` (flexible).

### Boss Final : Application de réservation de voyages
**Mise en pratique complète** de tous les concepts appris dans un projet réel avec :
- Formulaire multi-sections (5 parties)
- Validations natives et personnalisées
- Gestion d'état avec Signals
- Activation conditionnelle des sections
- Persistance des données en localStorage
- Liste interactive avec suppression

## 🎓 Compétences acquises

À l'issue de ce projet, vous maîtrisez :

### Fondamentaux des ReactiveForms
- ✅ Création et typage de formulaires réactifs (`FormControl`, `FormGroup`)
- ✅ Utilisation des validateurs natifs (`required`, `min`, `max`, `minLength`, `pattern`, `email`)
- ✅ Création de validateurs personnalisés (`ValidatorFn`, `ValidationErrors`)
- ✅ Gestion des erreurs de validation avec feedback utilisateur

### Gestion dynamique des formulaires
- ✅ Activation/désactivation conditionnelle des contrôles (`enable()`, `disable()`)
- ✅ Modification programmatique des valeurs (`setValue()`, `patchValue()`)
- ✅ Réinitialisation des formulaires (`reset()`, gestion du `pristine`/`dirty`)
- ✅ Ajout/suppression dynamique de validateurs

### Réactivité avec Signals
- ✅ Conversion d'Observables en Signals (`toSignal()`)
- ✅ Réaction aux changements avec `effect()`
- ✅ Écoute des changements de valeur et de statut (`valueChanges`, `statusChanges`)
- ✅ Création de ViewModels réactifs avec `computed()`

### Architecture et patterns
- ✅ Architecture **feature-based** avec composants standalone
- ✅ Séparation des préoccupations (composants, services, modèles)
- ✅ Communication parent-enfant avec `input()` et `output()`
- ✅ Gestion d'état locale avec services et Signals
- ✅ Persistance des données côté client (localStorage)

### Intégration et bonnes pratiques
- ✅ Intégration de **TailwindCSS** dans Angular
- ✅ Design system avec composants réutilisables (cards, toasts)
- ✅ Interface responsive et accessible
- ✅ Optimisation des performances avec `OnPush` change detection

## 📝 Notes pour la production

Ce projet privilégie la **clarté pédagogique** et les **bonnes pratiques** plutôt que la complexité. Pour une application de production, considérez l'ajout de :

- State management global (NgRx, Signal Store)
- Gestion avancée des erreurs et logging
- Optimisation du bundle et lazy loading

---

**Projet pédagogique** développé avec ❤️ dans le cadre du module **"Maîtriser les formulaires en ReactiveForms"** - [Easy Angular Kit](https://easyangularkit.com?via=djoudj)
