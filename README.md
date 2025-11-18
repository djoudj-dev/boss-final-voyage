# ✈️ Boss de fin : Envie de voyage ?

Exercice pratique Angular 20+ - Formulaire de réservation de voyage avec validation et gestion d'état.

## 🎯 Objectif de l'exercice

Créer un formulaire de réservation complet avec :

- ✅ 5 sections de formulaire (infos perso, type voyage, vol, passager extra, options)
- ✅ Validations natives et customs
- ✅ Liste des réservations
- ✅ Persistance en localStorage

## 🚀 Démarrage rapide

```bash
npm install
npm start
```

Application sur http://localhost:4200

## 📁 Architecture (pragmatique)## 📁 Architecture (pragmatique)

```
src/app/
├── features/booking/
│   ├── components/          # UI
│   │   ├── form/           # Formulaire
│   │   ├── list/           # Liste
│   │   └── item/           # Item
│   ├── services/
│   │   └── reservation-service.ts
│   └── models/
│       └── reservation-model.ts
└── shared/                  # Réutilisable
    ├── cards/
    ├── form-field/
    ├── validators/
    └── toast/
```

## ✅ Bonnes pratiques Angular 20+

- **Standalone components** (pas de NgModules)
- **Signals** pour l'état réactif
- **OnPush** change detection
- **inject()** au lieu de constructors
- **@if/@for** au lieu de *ngIf/*ngFor
- **input()/output()** functions
- **toSignal()** pour les Observables
- **Reactive Forms** avec validations dynamiques

## 🎓 Note sur l'approche

Ce projet adopte une **architecture pragmatique** adaptée à un exercice :

- ✅ Code simple et lisible
- ✅ Juste ce qui est nécessaire
- ❌ Pas de sur-engineering

Pour la production, ajoutez : tests, state management, API, i18n...

## 📦 Build

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
