# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Social Media Dashboard

This project is a Social Media Dashboard built with React, TypeScript, and Vite. It includes features like Redux for state management, Chart.js for data visualization, i18next for internationalization, and styled-components for styling. Below are the instructions to set up and run the project locally or on a server.

## Table of Contents

### Prerequisites

- Setup

- Running the Project Locally

- Building for Production

- Running on a Server

- Linting and Type Checking

- Testing

- Dependencies

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- Node.js (v18 or higher)

- npm (v9 or higher) or yarn

- Git (for cloning the repository)

## Setup

- Clone the Repository:

`js
git clone https://github.com/your-username/social-media-dashboard.git
cd social-media-dashboard
`

- Install dependencies:

`js
npm install
`
or if you're using yarn:
`js
yarn install
`

- Environment Variables:
  `js
VITE_API_URL=https://api.example.com
`

- Running the Project Locally
  `js
npm run dev
`
  or
  `js 
yarn dev
`

- Build for Production

```js
npm run build
```

The following packages are used in this project:

Core Dependencies
React: `js react & react-dom (v19) `
Axios: `js For making API requests `

### Development Dependencies

TypeScript: `js typescript `
ESLint: `js eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh `
Vite: `js vite, @vitejs/plugin-react `

## Data Visualization

- Chart.js (^4.4.8) - JavaScript charting library.
- React ChartJS 2 (^5.3.0) - React wrapper for Chart.js.

## Internationalization

- i18next (^24.2.3) - Internationalization framework.

- React i18next (^15.4.1) - React bindings for i18next.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
