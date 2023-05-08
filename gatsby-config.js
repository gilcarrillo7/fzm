module.exports = {
	siteMetadata: {
		siteUrl: "https://fzm-berlin.com/",
		defaultTitle: "FZM",
		defaultDescription: "Feministisches Zentrum für Migrant*innen",
		author: `@trazovivo`,
		defaultImage: `static/FZM_logo.png`,
	},
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-plugin-postcss",
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [`Roboto`, `Roboto\:100,300,500,700`],
				display: "swap",
			},
		},
		"gatsby-plugin-react-helmet",
	],
};
