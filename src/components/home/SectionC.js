import React from "react";
import { Link } from "gatsby";

import Section from "../layout/section/Section";

const SectionC = (props) => {
	const {
		pagecontent: { title, content, buttonText },
		uri,
	} = props;
	return (
		<Section>
			<div className="flex flex-col sm:mt-12">
				<div className="mt-4 flex flex-col sm:flex-row">
					<div className="sm:w-2/3 sm:pr-8 flex flex-col items-start justify-center sm:pb-16">
						<p className="text-brown xl:text-3xl text-2xl mb-4">
							{title && title}
						</p>
						<p
							className="text-black text-xl"
							style={{ whiteSpace: "pre-wrap" }}
						>
							{content && content}
						</p>
					</div>
					<div className="sm:w-1/3 flex justify-center flex-col">
						{uri && (
							<img
								className="m-auto sm:mt-0 mt-4 mb-8 w-full md:pl-8"
								src={uri}
								alt="FZM"
							/>
						)}
						<div className="flex justify-center">
							<Link
								to="/team"
								className="bg-transparent text-brown py-4 sm:py-2 px-12 border border-brown font-bold text-xl sm:w-56 w-full text-center md:ml-8"
							>
								{buttonText ? buttonText : "Team"}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default SectionC;
