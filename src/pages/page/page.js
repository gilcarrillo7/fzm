import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../../components/layout/page-layout";

import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { AppContext } from "../../context/AppContext";

const Projekte = (props) => {
	const { baseUrl } = useContext(AppContext);
	const [project, setProject] = useState(null);
	const [progress, setProgress] = useState(0);
	const {
		location: { search },
	} = props;

	useEffect(() => {
		const postId = search.split("=")[1];
		const postIdup = Number(postId) - 1;
		axios
			.get(
				`${baseUrl}/posts?include[]=${postId}&include[]=${postIdup}&timestamp=${new Date().getTime()}&per_page=100`
			)
			.then((res) => {
				setProgress(50);
				const title = res.data[0].acf.title;
				const content = res.data[0].acf.content;
				const linktext = res.data[0].acf.linktext;
				const url = res.data[0].acf.url;
				axios.get(`${baseUrl}/media/${res.data[0].acf.image}`).then((res) => {
					setProject({
						title,
						content,
						img: res.data.guid.rendered,
						linktext,
						url,
					});
					setProgress(100);
				});
			});
	}, [baseUrl, search]);

	return (
		<>
			<LoadingBar color="#966846" progress={progress} />
			{progress === 100 && project && (
				<PageLayout
					title={project.title}
					p={project.content}
					img={project.img}
					linktext={project.linktext}
					url={project.url}
				/>
			)}
		</>
	);
};

export default Projekte;
