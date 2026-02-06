import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors
                primary: {
                    50: '#fef9f3',
                    100: '#fdf2e6',
                    200: '#fae5cc',
                    300: '#f6d7b3',
                    400: '#f3ca99',
                    500: '#D4A574', // Main brand amber/golden
                    600: '#c89560',
                    700: '#b07d4a',
                    800: '#8f6539',
                    900: '#6e4d2b',
                },

                // Category-specific colors
                restaurant: {
                    DEFAULT: '#8B4513',
                    light: '#A0522D',
                    dark: '#654321',
                },
                icecream: {
                    DEFAULT: '#FF1744',
                    light: '#FF5252',
                    dark: '#C51162',
                },
                cafe: {
                    DEFAULT: '#4A2C2A',
                    light: '#6D4C41',
                    dark: '#3E2723',
                },
                chocolate: {
                    DEFAULT: '#3E2723',
                    light: '#5D4037',
                    dark: '#1B0000',
                },
                boutique: {
                    DEFAULT: '#F5F5DC',
                    light: '#FFFEF0',
                    dark: '#D4D4B8',
                },
                lodging: {
                    DEFAULT: '#2E7D32',
                    light: '#4CAF50',
                    dark: '#1B5E20',
                },
                beer: {
                    DEFAULT: '#FFB300',
                    light: '#FFC107',
                    dark: '#FF8F00',
                },
                plants: {
                    DEFAULT: '#66BB6A',
                    light: '#81C784',
                    dark: '#4CAF50',
                },
                liquor: {
                    DEFAULT: '#1A237E',
                    light: '#283593',
                    dark: '#0D1642',
                },
                border: 'hsl(var(--border, 214.3 31.8% 91.4%))',

                // Extra palette
                'brand-dark': '#121A0F', // Dark forest green for chocolate/premium sections
                'brand-light': '#F9F9F9', // Subtle gray for background
            },

            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },

            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },

            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
                'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 20px 50px -10px rgba(0, 0, 0, 0.1)',
            },

            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'float': 'float 3s ease-in-out infinite',
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}

export default config
