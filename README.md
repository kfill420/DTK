# DTK – Application Web Moderne

DTK est une application web conçue pour offrir une expérience fluide, réactive et sécurisée autour de fonctionnalités interactives, en temps réel et orientées utilisateur. Le projet repose sur une architecture front-end moderne, intégrant des outils performants pour la gestion d’état, la communication réseau et la sécurité des données.

## Objectifs du projet

Fournir une interface moderne et intuitive.

Gérer des interactions en temps réel via WebSockets.

Assurer une communication sécurisée avec une API externe.

Offrir une structure front-end robuste, scalable et maintenable.

Intégrer une authentification fiable via Supabase.

## Stack technique

### Framework & outils principaux

React 18 – Interface utilisateur.

React Router DOM – Navigation entre les pages.

Redux Toolkit – Gestion d’état centralisée.

Reselect – Sélecteurs optimisés.

React Transition Group – Animations fluides.

React Intersection Observer – Déclenchement d’animations au scroll.

### Communication & sécurité

Axios – Requêtes HTTP.

Socket.io  Client – Communication en temps réel.

Supabase – Authentification et gestion des utilisateurs.

DOMPurify – Sécurisation des contenus HTML.

jwt-decode – Gestion des tokens JWT.

### Outils de développement

Vite – Dev server rapide et build optimisé.

TypeScript – Typage strict et fiabilité.

Sass – Styles modulaires.

ESLint + Prettier – Qualité et cohérence du code.

Rollup Visualizer – Analyse du bundle.

## Scripts disponibles

```json
"dev": "vite",
"build": "tsc -b && vite build",
"lint": "eslint .",
"preview": "vite preview"
```

## Structure générale du projet

```
src/
  components/        # Composants UI réutilisables
  pages/             # Pages principales
  store/             # Redux Toolkit (slices, store)
  hooks/             # Hooks personnalisés
  utils/             # Fonctions utilitaires (auth, formatage…)
  styles/            # Fichiers SCSS
  App.tsx
  main.tsx
```