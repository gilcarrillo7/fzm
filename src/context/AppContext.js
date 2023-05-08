import React, { useState, createContext, useEffect, useMemo } from "react";
import axios from "axios";

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = (props) => {
	const baseUrl = "https://fzm-berlin.com/wp/wp-json/wp/v2";
	const [logoUrl, setLogoUrl] = useState("");
	const [instagramUrl, setInstagramUrl] = useState("");
	const [logoIg, setLogoIg] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);
	const [footerText, setFooterText] = useState();
	const [currSection, setCurrSection] = useState(1);
	const [catData, setCatData] = useState(new Map());
	const [menuItems, setMenuItems] = useState([]);

	const categories = useMemo(() => {
		const cats = new Map();
		catData.forEach((cat) => cats.set(cat.slug, cat.id));

		return cats;
	}, [catData]);

	useEffect(() => {
		axios
			.get(
				`${baseUrl}/categories?timestamp=${new Date().getTime()}&per_page=100`
			)
			.then((res) => {
				setCatData(res.data);
			});
	}, []);

	useEffect(() => {
		if (categories.get("logo"))
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"logo"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => res.data[0].acf.logo)
				.then((idLogo) => {
					if (idLogo)
						axios
							.get(`${baseUrl}/media/${idLogo}`)
							.then((res) => setLogoUrl(res.data.guid.rendered));
				});

		if (categories.get("instagram"))
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"instagram"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					setInstagramUrl(res.data[0].acf.url);
					return res.data[0].acf.icon;
				})
				.then((idLogo) => {
					if (idLogo)
						axios
							.get(`${baseUrl}/media/${idLogo}`)
							.then((res) => setLogoIg(res.data.guid.rendered));
				});

		if (categories.get("home"))
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"home"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					setMenuItems(
						res.data
							.sort((a, b) =>
								Number(a.slug.split("-")[1]) > Number(b.slug.split("-")[1])
									? 1
									: Number(b.slug.split("-")[1]) > Number(a.slug.split("-")[1])
									? -1
									: 0
							)
							.map((el) => el.acf.menutext)
					);
				});

		if (categories.get("footer"))
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"footer"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					setFooterText(res.data[0].acf);
				});
	}, [categories]);

	return (
		<Provider
			value={{
				baseUrl,
				menuOpen,
				setMenuOpen,
				currSection,
				setCurrSection,
				logoUrl,
				instagramUrl,
				logoIg,
				footerText,
				categories,
				menuItems,
			}}
		>
			{props.children}
		</Provider>
	);
};

export { AppContext, AppProvider };
