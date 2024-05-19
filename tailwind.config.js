const { nextui } = require('@nextui-org/react');
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                drawCircle: {
                    '0%': { strokeDasharray: '0, 314', strokeDashoffset: '-78.5' },
                    '100%': { strokeDasharray: '314, 0', strokeDashoffset: '-78.5' },
                },
                drawTick: {
                    '0%': { strokeDasharray: '0, 26', strokeDashoffset: '0' },
                    '100%': { strokeDasharray: '26, 0', strokeDashoffset: '0' },
                },
            },
            animation: {
                'draw-circle': 'drawCircle 1s ease-in forwards',
                'draw-tick': 'drawTick 0.5s ease-out 1s forwards',
            },

            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                fontStyle: ['placeholder'],
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
