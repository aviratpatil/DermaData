/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#10B981", // Emerald 500
                warning: "#F59E0B", // Amber 500
                danger: "#F43F5E",  // Rose 500
                dark: "#0F172A",    // Slate 900
            }
        },
    },
    plugins: [],
}
