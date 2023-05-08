module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			brown: "#966846",
			black: "#000000",
			white: "#FFFFFF",
		},
		container: {
			padding: {
				DEFAULT: "60px",
				sm: "1rem",
				lg: "2rem",
				xl: "3rem",
				"2xl": "4rem",
			},
		},
		screens: {
			sm: "550px",
			// => @media (min-width: 640px) { ... }
			md: "675px",
			// => @media (min-width: 768px) { ... }
			lg: "800px",
			// => @media (min-width: 1024px) { ... }
			xl: "925px",
			// => @media (min-width: 1280px) { ... }
			"2xl": "1050px",
			// => @media (min-width: 1536px) { ... }
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
