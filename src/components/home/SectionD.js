import React, { useState } from "react";
import { Link } from "gatsby";

import Section from "../layout/section/Section";
import RightArrow from "../layout/RightArrow";
import LeftArrow from "../layout/LeftArrow";

const SectionD = (props) => {
	const {
		pagecontent: { title, buttonText },
		projects,
	} = props;
	const [index, setIndex] = useState(0);

	const Project = ({ pr, type }) => (
		<div
			className={`flex-1 flex justify-center ${
				type === "left" ? "lg:absolute lg:-left-10" : ""
			} ${type === "right" ? "lg:absolute lg:-right-10" : ""}`}
			style={{ maxWidth: "250px" }}
		>
			<div className="text-center">
				{pr.thumbUrl && (
					<img
						className="m-auto"
						style={{ width: "120px" }}
						src={pr.thumbUrl}
						alt="FZM"
					/>
				)}
				<p className="text-black text-xl font-bold my-3">{pr.title}</p>
				<p className="text-black text-sm font-normal">{pr.preview}</p>
				<Link
					to={`/projekte/projekte?id=${pr.idApi}`}
					className="text-brown text-base font-normal underline"
				>
					{pr.linktext}
				</Link>
			</div>
		</div>
	);

	return (
		<Section>
			<div className="flex flex-col sm:mt-12">
				<p className="text-3xl text-brown text-center">{title && title}</p>
				<div className="my-8 hidden lg:flex flex-no-shrink content-between justify-center flex-col lg:flex-row relative">
					{projects.map((pr, indx) => (
						<Project
							key={pr.id}
							pr={pr}
							type={indx === 0 ? "left" : indx === 1 ? "center" : "right"}
						/>
					))}
				</div>
				<div className="flex lg:hidden relative my-8 items-center justify-center">
					<LeftArrow
						className="absolute left-0 cursor-pointer -mt-16"
						onClick={() =>
							setIndex(index === 0 ? projects.length - 1 : index - 1)
						}
						color="#966846"
					/>
					{projects[index] && <Project pr={projects[index]} />}
					<RightArrow
						className="absolute right-0 cursor-pointer -mt-16"
						onClick={() =>
							setIndex(index === projects.length - 1 ? 0 : index + 1)
						}
						color="#966846"
					/>
				</div>
				<div className="flex justify-center">
					<Link
						to="/projekte"
						className="bg-transparent text-brown py-4 sm:py-2 px-12 border border-brown font-bold text-xl sm:w-56 w-full text-center"
					>
						{buttonText ? buttonText : "Alle Projekte"}
					</Link>
				</div>
			</div>
		</Section>
	);
};

export default SectionD;
