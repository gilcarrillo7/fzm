import React, { useState } from "react";
import { Link } from "gatsby";

import Section from "../layout/section/Section";
import RightArrow from "../layout/RightArrow";
import LeftArrow from "../layout/LeftArrow";

const SectionB = (props) => {
	const {
		pagecontent: { content, buttonText },
		pages,
	} = props;
	const [index, setIndex] = useState(0);

	const PageEl = ({ pr, type }) => {
		return (
			<div
				className={`flex-1 flex justify-center ${
					type === "left" ? "sm:absolute sm:-left-4" : ""
				} ${type === "right" ? "sm:absolute sm:-right-4" : ""}`}
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
					<div className="text-center">
						<p className="text-white text-xl font-bold my-3">{pr.title}</p>
						<Link
							to={`/page/page?id=${pr.idApi}`}
							className="text-white text-base font-normal underline"
						>
							{pr.link}
						</Link>
					</div>
				</div>
			</div>
		);
	};
	return (
		<Section>
			<div className="flex flex-col sm:mt-12">
				<p
					className="text-white xl:text-3xl text-2xl"
					style={{ whiteSpace: "pre-wrap" }}
				>
					{content && content}
				</p>
				<div className="my-8 hidden sm:flex flex-no-shrink content-between justify-center flex-col sm:flex-row relative">
					{pages.map((pr, indx) => (
						<PageEl
							key={`sectionBPage${indx}`}
							pr={pr}
							type={indx === 0 ? "left" : indx === 1 ? "center" : "right"}
						/>
					))}
				</div>
				<div className="flex sm:hidden relative my-8 items-center justify-center">
					<LeftArrow
						className="absolute left-0 cursor-pointer sm:hidden -mt-8"
						onClick={() => setIndex(index === 0 ? pages.length - 1 : index - 1)}
					/>
					{pages[index] && <PageEl pr={pages[index]} type="center" />}
					<RightArrow
						className="absolute right-0 cursor-pointer sm:hidden -mt-8"
						onClick={() => setIndex(index === pages.length - 1 ? 0 : index + 1)}
					/>
				</div>
				<div className="flex justify-center">
					<Link
						to="/projekte"
						className="bg-transparent text-white py-4 sm:py-2 px-12 border border-white font-bold text-xl sm:w-56 w-full text-center"
					>
						{buttonText ? buttonText : "Projekte"}
					</Link>
				</div>
			</div>
		</Section>
	);
};

export default SectionB;
