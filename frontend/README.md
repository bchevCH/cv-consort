# Frontend — CV Consort

Application React pour le CV interactif.

## Développement

```bash
npm install
npm run dev
```

Le serveur de développement tourne sur `http://localhost:5173`.

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build de production (TypeScript + Vite) |
| `npm run preview` | Preview du build local |
| `npm run lint` | Vérification ESLint |
| `npm run lint:fix` | Correction automatique ESLint |
| `npm run format` | Formatage Prettier |
| `npm run type-check` | Vérification TypeScript |

## Stack

- **React 18** avec TypeScript
- **Vite 6** pour le build
- **TailwindCSS** pour le styling
- **Framer Motion** pour les animations
- **i18next** pour l'internationalisation

## Structure

```
src/
├── components/
│   ├── layout/     # Header, Footer, etc.
│   ├── sections/   # Sections du CV (Hero, Experience, Skills...)
│   └── ui/         # Composants réutilisables
├── i18n/
│   └── locales/
│       ├── fr/     # Traductions françaises
│       └── en/     # Traductions anglaises
├── hooks/          # Custom hooks React
├── styles/         # Styles globaux
└── App.tsx
```

## Contenu du CV

Les textes sont dans les fichiers de traduction :
- `src/i18n/locales/fr/content.json` — Français
- `src/i18n/locales/en/content.json` — Anglais

Le site détecte automatiquement la langue du navigateur.
