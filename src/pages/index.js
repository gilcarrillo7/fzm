import React, { useState, useEffect, useContext, useRef } from "react";
import { Element, scroller } from "react-scroll";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";

import { AppContext } from "../context/AppContext";
import Layout from "../components/layout/layout";
import SectionA from "../components/home/SectionA";
import SectionB from "../components/home/SectionB";
import SectionC from "../components/home/SectionC";
import SectionD from "../components/home/SectionD";
import SectionE from "../components/home/SectionE";
import SectionF from "../components/home/SectionF";
import SectionG from "../components/home/SectionG";
import Seo from "../components/seo";

// markup
const IndexPage = () => {
	const [pages, setPages] = useState([]);
	const [imgUrls, setImgUrls] = useState([]);
	const [pageSection, setPageSection] = useState([]);
	const [projSection, setProjSection] = useState([]);
	const [calendar, setCalendar] = useState([]);
	const [progress, setProgress] = useState(0);
	const [imgUrlsFund, setImgUrlsFund] = useState([]);
	const { baseUrl, categories, setCurrSection, currSection } =
		useContext(AppContext);
	const sections = useRef(new Array(7));

	let removed = false;
	let handle = null;

	useEffect(() => {
		if (categories.get("home")) {
			setProgress(10);
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"home"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					setProgress(60);
					const requests = [];
					res = res.data.sort((a, b) =>
						Number(a.slug.split("-")[1]) > Number(b.slug.split("-")[1])
							? 1
							: Number(b.slug.split("-")[1]) > Number(a.slug.split("-")[1])
							? -1
							: 0
					);
					for (let i = 0; i < res.length; i++) {
						setPages((pages) => [
							...pages,
							{
								title: res[i].acf.title,
								content: res[i].acf.content,
								buttonText: res[i].acf.buttonText,
								imageId: res[i].acf.image,
								address: res[i].acf.address,
								hideButtonText: res[i].acf.hideButtonText,
								noEventsText: res[i].acf.noEventsText,
								mail: res[i].acf.mail,
								successmessage: res[i].acf.successmessage,
								errormessage: res[i].acf.errormessage,
							},
						]);
						if (res[i].acf.image && res[i].acf.image !== "")
							requests.push(axios.get(`${baseUrl}/media/${res[i].acf.image}`));
					}
					return requests;
				})
				.then((requests) => {
					setProgress(80);
					axios.all(requests).then((res) => {
						res.forEach((r) =>
							setImgUrls((imgUrls) => [...imgUrls, r.data.guid.rendered])
						);

						setProgress(100);
					});
				});
		}
		if (categories.get("page")) {
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"page"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					const pages = [];
					res = res.data.sort((a, b) =>
						a.acf.order > b.acf.order ? 1 : b.acf.order > a.acf.order ? -1 : 0
					);
					for (let i = 0; i < res.length; i++) {
						pages.push({
							id: i,
							title: res[i].acf.title,
							link: res[i].acf.homelink,
							idApi: res[i].id,
							thumb: res[i].acf.thumb,
						});
					}
					return pages;
				})
				.then((pages) => {
					const requests = pages
						.filter((page) => page.thumb && page.thumb !== "")
						.map((page) => axios.get(`${baseUrl}/media/${page.thumb}`));
					axios.all(requests).then((res) => {
						res.forEach(
							(r) =>
								(pages.find(
									(page) => page.thumb && page.thumb !== "" && !page.thumbUrl
								).thumbUrl = r.data.guid.rendered)
						);
						setPageSection(pages);
					});
				});
		}
		if (categories.get("project")) {
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"project"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					const proys = [];
					res = res.data.sort((a, b) =>
						a.acf.order > b.acf.order ? 1 : b.acf.order > a.acf.order ? -1 : 0
					);
					for (let i = 0; i < res.length; i++) {
						proys.push({
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
							nextId: res[i === res.length - 1 ? 0 : i + 1].id,
						});
						if (i >= 2) break;
					}
					return proys;
				})
				.then((proys) => {
					const requests = proys
						.filter((proy) => proy.thumb && proy.thumb !== "")
						.map((proy) => axios.get(`${baseUrl}/media/${proy.thumb}`));

					axios.all(requests).then((res) => {
						res.forEach(
							(r) =>
								(proys.find(
									(proy) => proy.thumb && proy.thumb !== "" && !proy.thumbUrl
								).thumbUrl = r.data.guid.rendered)
						);

						setProjSection(proys);
					});
				});
		}
		if (categories.get("calendar")) {
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"calendar"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					for (let i = 0; i < res.data.length; i++) {
						setCalendar((pages) => [
							...pages,
							{
								date: res.data[i].acf.date,
								description: res.data[i].acf.description,
								url: res.data[i].acf.url,
								urltext: res.data[i].acf.urltext,
							},
						]);
					}
				});
		}
		if (categories.get("funded")) {
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"funded"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					const imgIds = [];
					res = res.data.sort((a, b) =>
						a.acf.order > b.acf.order ? 1 : b.acf.order > a.acf.order ? -1 : 0
					);
					for (let i = 0; i < res.length; i++) {
						imgIds.push({ img: res[i].acf.image });
					}
					return imgIds;
				})
				.then((imgs) => {
					const requests = imgs
						.filter((img) => img.img && img.img !== "")
						.map((img) => axios.get(`${baseUrl}/media/${img.img}`));
					axios.all(requests).then((res) => {
						res.forEach(
							(r) =>
								(imgs.find(
									(img) => img.img && img.img !== "" && !img.imgUrl
								).imgUrl = r.data.guid.rendered)
						);
					});
					setImgUrlsFund(imgs);
				});
		}
	}, [baseUrl, categories]);

	const getIndxSection = (scrollPos) => {
		let indx = 0;
		let difference = sections.current[sections.current.length - 1].offsetTop;
		for (let i = 0; i < sections.current.length; i++) {
			let ndiff = Math.abs(sections.current[i].offsetTop - scrollPos);
			if (ndiff < difference) {
				difference = ndiff;
				indx = i;
			}
		}
		return indx;
	};

	const onScroll = () => {
		if (handle) {
			clearTimeout(handle);
		}
		handle = setTimeout(() => {
			if (window.innerWidth >= 640) {
				const indx = getIndxSection(window.scrollY) + 1;
				setCurrSection(indx);
				scroller.scrollTo(`section${indx}`, {
					duration: 200,
					delay: 20,
					smooth: true,
				});
			}
		}, 200);
	};

	useEffect(() => {
		window.addEventListener("scroll", onScroll);

		return () => {
			if (removed) {
				return;
			}
			removed = true;
			if (handle) {
				clearTimeout(handle);
			}
			window.removeEventListener("scroll", onScroll);
		};
	}, [onScroll]);

	useEffect(() => {
		if (progress === 100 && currSection /*&& window.innerWidth >= 640*/)
			scroller.scrollTo(`section${currSection}`, {
				duration: 200,
				delay: 20,
				smooth: true,
			});
	}, [currSection, progress]);

	return (
		<>
			<Seo title="FZM - Home" />
			<LoadingBar color="#966846" progress={progress} />
			{progress === 100 && (
				<Layout>
					<div id="section1" ref={(el) => (sections.current[0] = el)}>
						<Element className="sm:mb-0 mb-4 ">
							{pages[0] && <SectionA pagecontent={pages[0]} uri={imgUrls[0]} />}
						</Element>
					</div>
					<div id="section2" ref={(el) => (sections.current[1] = el)}>
						<Element className="bg-brown">
							{pages[1] && (
								<SectionB pagecontent={pages[1]} pages={pageSection} />
							)}
						</Element>
					</div>
					<div id="section3" ref={(el) => (sections.current[2] = el)}>
						<Element className="">
							<SectionC pagecontent={pages[2]} uri={imgUrls[1]} />
						</Element>
					</div>
					<div id="section4" ref={(el) => (sections.current[3] = el)}>
						<Element className="">
							<SectionD pagecontent={pages[3]} projects={projSection} />
						</Element>
					</div>
					<div id="section5" ref={(el) => (sections.current[4] = el)}>
						<Element className="">
							<SectionE pagecontent={pages[4]} calendar={calendar} />
						</Element>
					</div>
					<div id="section6" ref={(el) => (sections.current[5] = el)}>
						<Element>
							<SectionF pagecontent={pages[5]} />
						</Element>
					</div>
					<div id="section7" ref={(el) => (sections.current[6] = el)}>
						<Element>
							<SectionG
								pagecontent={pages[6]}
								uri={imgUrls[2]}
								imgUrls={imgUrlsFund}
							/>
						</Element>
					</div>
				</Layout>
			)}
		</>
	);
};

export default IndexPage;
