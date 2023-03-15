const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	safelist: [
		'theme-color-froly',
		'theme-color-malibu',
		'theme-color-heliotrope',
		'theme-font-sans',
		'theme-font-serif',
		'theme-font-mono',
		'modal-enter',
		'modal-enter-active',
		'modal-exit',
		'modal-exit-active',
		'timer-toggle',
		'timer-toggle--pomodoro',
		'timer-toggle--shortBreak',
		'timer-toggle--longBreak',
	],
	theme: {
		screens: {
			sm: "23.438em",
			md: "48em",
			lg: "62em",
			xl: "90em",
		},
		fontSize: {
			xs: ["0.75rem", "0.938rem"], // 12px / 15px
			sm: ["0.875rem", "1.125rem"], // 14px / 18px
			base: ["1rem", "1.25rem"], // 16px / 20px
			lg: ["1.25rem", "1.563rem"], // 20px / 25px
			xl: ["1.75rem", "2.188rem"], // 28px / 35px
			"2xl": ["5rem", "6.188rem"], // 80px / 99px
			"3xl": ["6.25rem", "7.75rem"], // 100px / 124px
		},
		colors: {
			skin: {
				fill: "hsl(var(--color-fill) / <alpha-value>)",
				'fill-hover': "hsl(var(--color-fill-hover) / <alpha-value>)",
			},
			"port-gore": "hsl(235,35%,18%)",
			periwinkle: "hsl(227,100%,92%)",
			mirage: "hsl(234,39%,14%)",
			lilac: "hsl(229,52%,96%)",
			froly: "hsl(0,91%,71%)",
			malibu: "hsl(182,91%,71%)",
			heliotrope: "hsl(284,89%,74%)",
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
		},
		letterSpacing: {
			wide: "0.264rem",
			widest: "0.875rem",
		},
		extend: {
			fontFamily: {
				"sans": ["Kumbh Sans", ...defaultTheme.fontFamily.sans],
				"serif": ["Roboto Slab", ...defaultTheme.fontFamily.serif],
				"mono": ["Space Mono", ...defaultTheme.fontFamily.mono],
			},
			borderWidth: {
				10: '10px'
			},
			spacing: {
				6.5: "1.625rem",
				4.5: "1.125rem",
				11.5: "2.875rem",
				17: "4.5rem",
				27: "6.875rem", // 110px
			},
			inset: {
				"5.5": "1.5rem", // 24px
			},
			width: {
				'30': '7.5rem', // 120px
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}