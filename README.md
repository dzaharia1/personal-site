# Dan Zaharia's Project Portfolio

[![Live Site](https://img.shields.io/badge/Live%20Site-projects.adanmade.app-FF7700?style=for-the-badge&logo=react)](https://projects.adanmade.app)

Welcome to the source repository for Dan Zaharia's personal projects showcase. This site is deployed and publicly accessible at **[projects.adanmade.app](https://projects.adanmade.app)**.

It serves as a clean, interactive log of creative hardware, software, AI, astronomy, and home automation projects built over the years.

---

## 📺 Aesthetics & Design

The site features a distinct **retro CRT terminal screen** emulation design with:
*   **Monospace Typography**: Styled with the clean *JetBrains Mono* font.
*   **CRT Scanline Animation**: A subtle custom CSS vertical sweep to simulate classic monitors.
*   **Amber Glow & Chromatic Aberration**: A text shadow effect representing RGB shift on phosphorus displays.
*   **Varying Categories**: Filterable tabs for exploring different projects.

---

## ⚡ Features

*   **Interactive Categorization**: Filter projects dynamically across categories like `Utility`, `AI`, `Astronomy`, `Play`, and `Home Automation`.
*   **Historical Timeline**: Projects are automatically grouped and sorted descending by release year.
*   **Rich Media Project Details**: Project pages support multi-image grids, `.mp4`/`.webm` inline video players, and full description blocks.
*   **Advanced Media Lightbox**:
    *   Click any media to open in full screen.
    *   **Smooth Zooming**: Zoom in/out via the mouse scroll wheel (or via a range slider on mobile devices).
    *   **Interactive Panning**: Grab-and-drag panning allows detailed inspection when zoomed in.

---

## 🛠️ Tech Stack

*   **Framework**: [React 18](https://react.dev/)
*   **Build Tool**: [Vite](https://vite.dev/)
*   **Routing**: [React Router v7](https://reactrouter.com/)
*   **Styling**: [styled-components](https://styled-components.com/) for isolated UI components and custom CSS variables for theme management.
*   **Deployment**: [Firebase Hosting](https://firebase.google.com/) with automated deployments via GitHub Actions.

---

## 📁 File Structure

The project has a modular file layout:
*   [src/data.js](file:///Users/danzaharia/Projects/personal-site/src/data.js): **The source of truth.** All project titles, years, links, categories, and media paths are configured here.
*   [src/App.jsx](file:///Users/danzaharia/Projects/personal-site/src/App.jsx): The landing page listing all projects, rendering filtering tabs, and grouping items by year.
*   [src/ProjectDetail.jsx](file:///Users/danzaharia/Projects/personal-site/src/ProjectDetail.jsx): Detailed view page for specific projects, containing media rendering logic and the interactive lightbox.
*   [src/components/Listing.jsx](file:///Users/danzaharia/Projects/personal-site/src/components/Listing.jsx): Handles list view layout for each project listing.
*   [src/components/Tabs.jsx](file:///Users/danzaharia/Projects/personal-site/src/components/Tabs.jsx): Handles category selection buttons.
*   [src/index.css](file:///Users/danzaharia/Projects/personal-site/src/index.css): CRT styling configurations, including scanlines, font loading, shadows, and root viewport bounds.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 3. Development Server
Start the local hot-reloading development server:
```bash
npm run dev
```
Open the local URL (usually `http://localhost:5173`) in your browser to inspect changes.

### 4. Build
Compile the site for production:
```bash
npm run build
```

---

## 🌐 Deployment

The site is configured to deploy to Firebase Hosting (`danzaharia-personal-site`). 

GitHub Actions workflows are set up under `.github/workflows/` to automatically deploy changes:
*   On pull requests, preview channels are generated.
*   On merge to `main`, the production site at **[projects.adanmade.app](https://projects.adanmade.app)** is updated.
