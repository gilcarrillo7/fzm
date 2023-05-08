import React, { useState, useEffect, useContext } from "react";

import Layout from "../components/layout/layout";
import LoadingBar from "react-top-loading-bar";
import { AppContext } from "../context/AppContext";

import axios from "axios";
import ProjecteCom from "../components/layout/projectecom";
import Footer from "../components/layout/footer";
import Seo from "../components/seo";

const Projekte = () => {
	const { baseUrl, categories } = useContext(AppContext);
	const [projects, setProjects] = useState([]);
	const [projectsMap, setProjectsMap] = useState(new Map());
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		setProgress(10);
		if (categories.get("project") && categories.get("custom_project"))
			axios
				.all([
					axios.get(
						`${baseUrl}/posts?categories=${categories.get(
							"project"
						)}&timestamp=${new Date().getTime()}&per_page=100`
					),
					axios.get(
						`${baseUrl}/posts?categories=${categories.get(
							"custom_project"
						)}&timestamp=${new Date().getTime()}&per_page=100`
					),
				])
				.then((res) => {
					setProgress(70);
					const resp = res[0].data.concat(res[1].data).slice();
					const projects = [];
					res = resp
						.sort((a, b) => b.acf.subcategory.localeCompare(a.acf.subcategory))
						.sort((a, b) =>
							a.acf.order > Number(b.acf.order)
								? 1
								: Number(b.acf.order) > Number(a.acf.order)
								? -1
								: 0
						);
					for (let i = 0; i < res.length; i++) {
						projects.push({
							id: i,
							idApi: res[i].id,
							subcategory: res[i].acf.subcategory,
							title: res[i].acf.title,
							order: res[i].acf.order,
							preview: res[i].acf.preview,
							content: res[i].acf.content,
							linktext: res[i].acf.linktext,
							image: res[i].acf.image,
							thumb: res[i].acf.thumb,
							video: res[i].acf.video,
							content2: res[i].acf.content2,
							image2: res[i].acf.image2,
							image3: res[i].acf.image3,
							image4: res[i].acf.image4,
							nexttext: res[i].acf.nexttext,
							customcontent: res[i].acf.nexttext.custom_content,
						});
					}
					return projects;
				})
				.then((projects) => {
					setProgress(90);
					const requests = projects
						.filter((proj) => proj.thumb && proj.thumb !== "")
						.map((proj) => axios.get(`${baseUrl}/media/${proj.thumb}`));
					axios.all(requests).then((res) => {
						setProgress(100);
						res.forEach(
							(r) =>
								(projects.find(
									(proj) => proj.thumb && proj.thumb !== "" && !proj.thumbUrl
								).thumbUrl = r.data.guid.rendered)
						);
						setProjects(projects);
					});
				});
	}, [baseUrl, categories]);

	useEffect(() => {
		const mapa = new Map();
		const catnames = [...new Set(projects.map((a) => a.subcategory))];
		catnames.forEach((catname) =>
			mapa.set(
				catname,
				projects.filter((a) => a.subcategory === catname)
			)
		);
		setProjectsMap(mapa);
	}, [projects]);
	return (
		<>
			<Seo title="FZM - Projekte" />
			<LoadingBar color="#966846" progress={progress} />
			{progress === 100 && (
				<Layout>
					<div className="min-h-screen flex flex-col">
						<div className="sm:mt-28 mt-24 text-white flex justify-center relative">
							<div className="container pb-12">
								<p className="text-3xl text-brown font-extralight mb-4">
									Alle Projekte
								</p>
								{[...projectsMap.keys()].map((pr) => (
									<div key={pr} className="mb-6">
										<p className="text-xl text-brown font-light mb-4 capitalize">
											{pr}
										</p>
										<div className="sm:grid sm:grid-cols-3 sm:gap-12 justify-center">
											{projectsMap.get(pr).map((project, index) => (
												<ProjecteCom
													key={project.id}
													title={project.title}
													descr={project.preview}
													url={`/projekte/projekte?id=${project.idApi}`}
													img={project.thumbUrl ? project.thumbUrl : ""}
													linktext={project.linktext}
													type={
														index % 3 === 0
															? "left"
															: index % 3 === 1
															? "center"
															: "right"
													}
												/>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
						<Footer />
					</div>
				</Layout>
			)}
		</>
	);
};

export default Projekte;
