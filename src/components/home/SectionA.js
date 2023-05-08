import React from "react";
import Section from "../layout/section/Section";

const SectionA = (props) => {
	const {
		pagecontent: { content },
		uri,
	} = props;
	return (
		<Section>
			<div
				className={`min-h-screen text-white flex sm:items-end justify-center relative`}
			>
				<div className="flex justify-center">
					<div className="sm:grid lg:grid-cols-3 sm:grid-cols-2">
						<div className="sm:order-2 sm:mb-0 sm:mt-0 mb-4 mt-4">
							{uri && (
								<img className="m-auto w-80 sm:w-auto" src={uri} alt="FZM" />
							)}
						</div>
						<div className="flex items-center sm:order-1">
							<p className="font-light text-2xl lg:pr-16 md:pr-8 sm:pr-16 pb-4 text-black lg:-ml-12 sm:-ml-4">
								{content && content}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default SectionA;
