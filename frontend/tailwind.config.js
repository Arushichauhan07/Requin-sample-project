// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{html,js,jsx,ts,tsx}',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Soft gradient for background to add a subtle depth
        backgroundStart: "#E9F1FA",
        backgroundEnd: "#F5F9FF",
        // Bright and energetic accent color for highlights, buttons, links
        accent: "#00ABE4",
        // Crisp white for main content sections, keeping the design fresh and clean
        primaryWhite: "#FFFFFF",
        // Deep blue for primary text, creating strong contrast and readability
        primaryText: "#2A3E4C",
        // Light, muted blue-gray for borders and secondary text for a polished, cohesive look
        lightGray: "#C5D1E5",
        // Darker gray for muted elements or text in dark mode
        secondaryGray: "#555E6B",
        neonGreen: '#00FF00',  // Neon Green for text
        neonBlue: '#00A9FF',   // Neon Blue for hover effects
        neonPink: '#FF007F',   // Neon Pink for hover effects
        // Dark mode specific adjustments
        dark: {
          backgroundStart: "#1C2533", // Dark navy for background start in dark mode
          backgroundEnd: "#273444",   // Slight gradient for depth in dark mode
          accent: "#00ABE4",          // Accent color remains consistent
          primaryText: "#D1D9E6",     // Light gray for readability on dark backgrounds
          secondaryText: "#A8B2C1",    // Muted blue-gray for less prominent text
        },
      },
      fontFamily: {
        // Clean, high-end sans-serif for the body text
        fontFamily: {
          sans: ['Inter', 'Arial', 'sans-serif'], // Premium sans-serif font for readability
          display: ['Lora', 'Georgia', 'serif'], // For sophisticated headings
        },
      },
      spacing: {
        '14': '3.5rem', // Add more spacing for larger elements
      },
      backgroundImage: {
        // Smooth gradient background for a sophisticated look
        'gradient-light': 'linear-gradient(135deg, #E9F1FA, #F5F9FF)',
        'gradient-dark': 'linear-gradient(135deg, #1C2533, #273444)',
      },
      boxShadow: {
        // Soft shadow for card elements, giving a floating effect
        card: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        // Rounded corners for a softer, friendly feel on elements
        'lg': '12px',
        'xl': '20px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
