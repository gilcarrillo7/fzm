import React from "react";
import { Link } from "gatsby";

const ProjecteCom = (props) => {
	const { title, descr, url, img, linktext, type } = props;
	return (
		<div
			className={`sm:mb-0 mb-4 relative ${
				type === "left"
					? "sm:justify-start"
					: type === "right"
					? "sm:justify-end"
					: ""
			}`}
		>
			<img
				className={`m-auto ${
					type === "left"
						? "sm:ml-0"
						: type === "right"
						? "sm:mr-0"
						: "sm:m-auto"
				}`}
				src={img}
				alt="FZM"
			/>
			<div
				className={`text-center w-full ${
					type === "left" ? "xl:-ml-20 sm:-ml-8" : type === "right" ? "xl:ml-20 sm:ml-8" : ""
				}`}
			>
				<p className="text-base text-black font-bold mt-4">{title}</p>
				<p className="text-sm text-black font-light mt-4 mb-4">{descr}</p>
				<p className="">
					<Link to={url} className="text-brown underline font-normal mt-4">
						{linktext ? linktext : "Weiterlesen"}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ProjecteCom;
