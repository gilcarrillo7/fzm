import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

import Footer from "../components/layout/footer";
import Member from "../components/team/member";
import Seo from "../components/seo";
import { AppContext } from "../context/AppContext";

const Team = () => {
	const { baseUrl, categories } = useContext(AppContext);
	const [members, setMembers] = useState([]);
	const [imgUrls, setImgUrls] = useState([]);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (categories.get("press")) {
			setProgress(10);
			axios
				.get(
					`${baseUrl}/posts?categories=${categories.get(
						"press"
					)}&timestamp=${new Date().getTime()}&per_page=100`
				)
				.then((res) => {
					setProgress(60);
					const imgIds = [];
					res = res.data.sort((a, b) =>
						a.acf.order > Number(b.acf.order)
							? 1
							: Number(b.acf.order) > Number(a.acf.order)
							? -1
							: 0
					);
					for (let i = 0; i < res.length; i++) {
						setMembers((members) => [
							...members,
							{
								content: res[i].acf.content,
								linktext: res[i].acf.linktext,
								url: res[i].acf.url,
							},
						]);
						imgIds.push(res[i].acf.image);
					}
					return imgIds;
				})
				.then((imgIds) => {
					setProgress(80);
					const requests = [];
					imgIds.forEach((imgid) =>
						requests.push(axios.get(`${baseUrl}/media/${imgid}`))
					);
					axios.all(requests).then((res) => {
						setProgress(100);
						res.forEach((r) =>
							setImgUrls((imgUrls) => [...imgUrls, r.data.guid.rendered])
						);
					});
				});
		}
	}, [baseUrl, categories]);

	return (
		<>
			<Seo title="FZM - Team" />
			<LoadingBar color="#966846" progress={progress} />
			{progress === 100 && (
				<Layout>
					<div className="min-h-screen flex flex-col">
						<div className="sm:mt-28 mt-24 text-white flex justify-center relative mt-6">
							<div className="container pb-12">
								<p className="text-3xl text-brown font-extralight mb-4">
									Presse
								</p>
								<div className="sm:grid sm:grid-cols-3 sm:gap-12 ">
									{members.map((member, indx) => (
										<Member
											key={`press${indx}`}
											img={imgUrls[indx]}
											title=""
											linktext={member.linktext}
											url={member.url}
										>
											{member.content}
										</Member>
									))}
								</div>
							</div>
						</div>
						<Footer />
					</div>
				</Layout>
			)}
		</>
	);
};

export default Team;
