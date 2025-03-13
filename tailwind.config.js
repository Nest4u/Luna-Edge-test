// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./.storybook/**/*.{js,ts,jsx,tsx}' // Add Storybook files
	],
	theme: {
		extend: {
			colors: {
				// Make sure all colors are defined as strings
				// If you have custom colors, ensure they are properly formatted
			}
		}
	},
	plugins: []
}
