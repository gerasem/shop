# Demo Online Store 🚀🔥

Welcome to the **Demo Online Store**! This project is a fast, sleek, and modern example of an e-commerce application built with the latest technologies, showcasing the power of **Vue.js**. 🛍️✨

## Key Features

- **Lightning-fast Performance** ⚡: Optimized for speed and responsiveness.
- **Modern Design** 🎨: A clean, minimalist user interface that focuses on usability.
- **Component-based Architecture** 🧩: Built with reusable, scalable Vue.js components.
- **Dynamic Language Support** 🌍: Includes localization using **vue-i18n** for seamless multi-language experiences.
- **Lazy Loading** 🕐: Implements lazy loading for assets to ensure quick load times.
- **State Management** 🗂️: Managed using **Pinia** for efficient data handling.
- **Routing** 🛤️: Dynamic and intuitive navigation powered by **Vue Router**.
- **SVG and Image Handling** 🖼️: Custom components for flexible integration of icons and images.

## Tech Stack 🔧

- **Frontend Framework**: Vue.js 3
- **State Management**: Pinia
- **Routing**: Vue Router
- **Localization**: vue-i18n
- **Build Tool**: Vite
- **TypeScript**: Strongly typed codebase for reliability and scalability.
- **SCSS**: Modular and maintainable styling.
- **Bulma SCSS Framework**: Old, but good

## Installation 💻

To get started, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gerasem/shop.git
   cd shop
   cd storefront
   ```

2. **Install dependencies:**
   ```bash
   npm i
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure 📂

```
src/
├── assets/               # Static files (images, icons, etc.)
├── components/           # Reusable Vue components
│   ├── base/             # Base components (BaseIcon, BaseImage, etc.)
├── core/                 # Core application files
│   ├── layouts/          # Application layouts
│   ├── views/            # Page components (HomeView, AboutView, etc.)
├── locales/              # Localization files (en-US.json, de-DE.json)
├── router/               # Vue Router setup
├── store/                # Pinia store modules
├── styles/               # Global SCSS styles
├── App.vue               # Root Vue component
├── main.ts               # Application entry point
```

## Usage 🛠️

### Localization
- By default, the application supports English (`en`) and German (`de`).
- The language can be switched dynamically based on the URL or user preference.

### Custom Icons and Images
- Icons are stored in `src/assets/icons/` and handled by the `BaseIcon` component.
- Images are stored in `src/assets/images/` and handled by the `BaseImage` component.

## Contributing 🤝

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License 📜

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

### Demo Online Store 🌟
This is not a functional e-commerce platform but a demonstration project designed for learning and experimentation with modern web development technologies. Enjoy exploring and customizing it to fit your needs! 🚀🔥

