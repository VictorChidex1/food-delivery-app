# FoodFlow 🍔🚀

FoodFlow is a modern, feature-rich food delivery application built with React and Vite. It provides a seamless experience for users to discover restaurants, place orders, track deliveries, and manage their profiles.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

## 🌟 Features

- **📱 Responsive Design**: Fully responsive UI built with Tailwind CSS for mobile, tablet, and desktop.
- **🔐 Authentication**: Secure Login, Signup, and Password Recovery flows.
- **🍽️ Restaurant Discovery**: Browse restaurants, view menus, and filter by cuisine.
- **🛒 Smart Cart & Checkout**: Seamless ordering process with Paystack payment integration.
- **📍 Order Tracking**: Real-time order tracking with interactive maps using Leaflet.
- **👤 User Dashboard**: Manage Orders, Favorites, Wallet, and Profile Settings.
- **🔔 Real-time Notifications**: Toast notifications for user actions using Sonner.
- **🎨 Modern UI/UX**: Smooth animations with Framer Motion and clean iconography with Lucide React.
- **📚 Content Pages**: Integrated Blog, Careers, About Us, and Help Center pages.
- **🛡️ Admin Dashboard**: Secure area for managing job applications and platform data.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Payments**: [Paystack](https://paystack.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/VictorChidex1/food-delivery-app.git
    cd food-delivery-app
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Navigate to `http://localhost:5173` to view the app.

## 📂 Project Structure

```
src/
├── components/   # Reusable UI components (Header, Navbar, etc.)
├── context/      # Global state management (SearchContext)
├── data/         # Mock data and constants
├── pages/        # Application views (Home, Restaurant, Checkout, etc.)
├── utils/        # Helper functions
├── App.jsx       # Main application component with Routing
└── main.jsx      # Entry point
```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
