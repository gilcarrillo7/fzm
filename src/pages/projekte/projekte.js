import React, { useEffect, useState, useContext } from "react";
import Seo from "../../components/seo";
import ReactPlayer from "react-player";
import { Link } from "gatsby";
import Footer from "../../components/layout/footer";
import Layout from "../../components/layout/layout";

import { AppContext } from "../../context/AppContext";

import axios from "axios";
import LoadingBar from "react-top-loading-bar";

const Projekte = (props) => {
	const { baseUrl, categories } = useContext(AppContext);
	const [project, setProject] = useState(null);
	const [progress, setProgress] = useState(0);
	const [nextid, setNextid] = useState(0);
	const {
		location: { search },
	} = props;

	useEffect(() => {
		const postId = search.split("=")[1];
		const postIdup = Number(postId) - 1;
		axios
			.get(
				`${baseUrl}/posts?include[]=${postId}&include[]=${postIdup}&timestamp=${new Date().getTime()}`
			)
			.then((res) => {
				setProgress(50);
				const title = res.data[0].acf?.title;
				const content = res.data[0].acf?.content;
				const image = res.data[0].acf?.image;
				const video = res.data[0].acf?.video;
				const content2 = res.data[0].acf?.content2;
				const image2 = res.data[0].acf?.image2;
				const image3 = res.data[0].acf?.image3;
				const image4 = res.data[0].acf?.image4;
				const nexttext = res.data[0].acf?.nexttext;
				const url = res.data[0].acf?.url;
				const urltext = res.data[0].acf?.urltext;
				const customcontent = res.data[0].acf?.custom_content;
				const customcontent2 = res.data[0].acf?.custom_content2;
				if (image || image2 || image3 || image4) {
					axios
						.all([
							axios.get(`${baseUrl}/media/${image}`),
							axios.get(`${baseUrl}/media/${image2}`),
							axios.get(`${baseUrl}/media/${image3}`),
							axios.get(`${baseUrl}/media/${image4}`),
						])
						.then((res) => {
							setProgress(100);
							setProject({
								title,
								content,
								image: image !== "" ? res[0].data.guid.rendered : null,
								video,
								content2,
								image2: image2 !== "" ? res[1].data.guid.rendered : null,
								image3: image3 !== "" ? res[2].data.guid.rendered : null,
								image4: image4 !== "" ? res[3].data.guid.rendered : null,
								nexttext,
								url,
								urltext,
							});
						});
				} else {
					setProgress(100);
					setProject({
						title,
						content,
						video,
						nexttext,
						customcontent,
						customcontent2,
					});
				}
			});
	}, [search, baseUrl]);

	useEffect(() => {
		if (categories.get("project") && categories.get("custom_project")) {
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
					const resp = res[0].data.concat(res[1].data).slice();
					const orderedLau = resp
						.filter((a) => a.acf.subcategory.toLowerCase().includes("laufende"))
						.sort((a, b) =>
							a.acf.order > b.acf.order ? 1 : b.acf.order > a.acf.order ? -1 : 0
						);
					const orderedOthers = resp
						.filter(
							(a) => !a.acf.subcategory.toLowerCase().includes("laufende")
						)
						.sort((a, b) => a.acf.subcategory.localeCompare(b.acf.subcategory))
						.sort((a, b) =>
							a.acf.order > b.acf.order ? 1 : b.acf.order > a.acf.order ? -1 : 0
						);
					const ordered = orderedLau.concat(orderedOthers);
					for (let i = 0; i < ordered.length; i++) {
						if (ordered[i].id === Number(search.split("=")[1])) {
							setNextid(ordered[i === ordered.length - 1 ? 0 : i + 1].id);
							break;
						}
					}
				});
		}
	}, [search, categories, baseUrl]);

	return (
		<>
			<LoadingBar color="#966846" progress={progress} />
			{progress === 100 && project && (
				<Layout>
					<Seo title={`FZM - ${project.title ? project.title : ""}`} />
					{project.customcontent ? (
						<div className="min-h-screen flex flex-col pt-24 sm:pt-0">
							<div className="sm:mt-28 mt-24 flex justify-center relative mt-auto sm:mx-0 -mx-8">
								<div className="container pb-12">
									<p className="text-3xl text-brown font-extralight">
										{project.title ? project.title : ""}
									</p>
									<div
										className="mt-4"
										dangerouslySetInnerHTML={{
											__html: project.customcontent,
										}}
										style={{ whiteSpace: "pre-wrap" }}
									></div>
									{project.video && (
										<div className="relative h-72 md:h-screen my-4 sm:my-8">
											<ReactPlayer
												url={project.video}
												width="100%"
												height="100%"
												className="absolute top-0 left-0"
											/>
										</div>
									)}
									<div
										className="mt-4"
										dangerouslySetInnerHTML={{
											__html: project.customcontent2,
										}}
										style={{ whiteSpace: "pre-wrap" }}
									></div>
									<div className="mt-4">
										<Link
											to={`/projekte/projekte?id=${nextid}`}
											className="text-3xl text-brown font-extralight"
										>
											{project.nexttext ? project.nexttext : "Nächstes Projekt"}
										</Link>
									</div>
								</div>
							</div>
							<Footer />
						</div>
					) : (
						<div className="min-h-screen flex flex-col pt-24 sm:pt-0">
							<div className="sm:mt-28 mt-24 text-white flex justify-center relative mt-auto sm:mx-0 -mx-8">
								<div className="container pb-12">
									<div className="sm:grid sm:grid-cols-2">
										<div className="sm:order-2 sm:mb-0 mb-6">
											{project.image && project.image !== "" && (
												<img
													className="m-auto w-full"
													src={project.image}
													alt="FZM"
												/>
											)}
										</div>
										<div className="sm:order-1 sm:pr-8">
											<p className="text-3xl text-brown font-extralight">
												{project.title ? project.title : ""}
											</p>
											<p
												className="text-base text-black font-light mt-4"
												style={{ whiteSpace: "pre-wrap" }}
											>
												{project.content ? project.content : ""}
											</p>
										</div>
									</div>
									{project.video && (
										<div className="relative h-72 md:h-screen my-4 sm:my-8">
											<ReactPlayer
												url={project.video}
												width="100%"
												height="100%"
												className="absolute top-0 left-0"
											/>
										</div>
									)}
									{project.content2 !== "" && (
										<div className="sm:w-2/3 my-4">
											<p
												className="text-base text-black"
												style={{ whiteSpace: "pre-wrap" }}
											>
												{project.content2}
											</p>
										</div>
									)}
									{(project.image2 || project.image3) && (
										<div className="sm:grid sm:grid-cols-2 md:gap-12 lg:gap-24 mb-0 sm:mb-8">
											{project.image2 && project.image2 !== "" && (
												<div className="mb-4 sm:mb-0 sm:mr-2">
													<img
														className="w-full"
														src={project.image2}
														alt="FZM"
													/>
												</div>
											)}
											{project.image3 && project.image3 !== "" && (
												<div className="mb-4 sm:mb-0 sm:ml-2">
													<img
														className="w-full"
														src={project.image3}
														alt="FZM"
													/>
												</div>
											)}
										</div>
									)}
									{project.image4 && project.image4 !== "" && (
										<div className="mb-8">
											<img className="w-full" src={project.image4} alt="FZM" />
										</div>
									)}
									{project.url && project.url !== "" && (
										<div className="mt-4">
											<p className="text-base font-light underline">
												<a
													className="text-brown"
													href={project.url}
													target="_blank"
													rel="noreferrer"
												>
													{project.urltext ? project.urltext : project.url}
												</a>
											</p>
										</div>
									)}
									<div className="mt-4">
										<Link
											to={`/projekte/projekte?id=${nextid}`}
											className="text-3xl text-brown font-extralight"
										>
											{project.nexttext ? project.nexttext : "Nächstes Projekt"}
										</Link>
									</div>
								</div>
							</div>
							<Footer />
						</div>
					)}
				</Layout>
			)}
		</>
	);
};

export default Projekte;
