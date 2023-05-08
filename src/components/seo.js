import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";

const SEO = ({ description, article, title, image }) => {
	/*
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						defaultTitle
						defaultDescription
						author
						defaultImage
					}
				}
			}
		`
	);
	const { defaultTitle, defaultDescription, defaultImage } = site.siteMetadata;
	*/
	const { pathname } = useLocation();

	//const siteUrl = "https://fzm-berlin.com/";
	const defaultTitle = "FZM";
	const defaultDescription = "Feministisches Zentrum für Migrant*innen";
	//const author = `@trazovivo`;
	const defaultImage = `static/FZM_logo.png`;

	const seo = {
		title: title || defaultTitle,
		description: description || defaultDescription,
		image: `${image || defaultImage}`,
		url: `${pathname}`,
	};

	return (
		<Helmet title={seo.title} titleTemplate={seo.title}>
			<meta name="description" content={seo.description} />
			<meta name="image" content={seo.image} />
			{seo.url && <meta property="og:url" content={seo.url} />}
			{(article ? true : null) && <meta property="og:type" content="article" />}
			{seo.title && <meta property="og:title" content={seo.title} />}
			{seo.description && (
				<meta property="og:description" content={seo.description} />
			)}
			{seo.image && <meta property="og:image" content={seo.image} />}
			{seo.description && (
				<meta property="og:description" content={seo.description} />
			)}
			<meta name="twitter:card" content="summary_large_image" />
			{seo.title && <meta name="twitter:title" content={seo.title} />}
			{seo.description && (
				<meta name="twitter:description" content={seo.description} />
			)}
			{seo.image && <meta name="twitter:image" content={seo.image} />}
		</Helmet>
	);
};

SEO.defaultProps = {
	lang: `de`,
	meta: [],
	description: ``,
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
};

export default SEO;
