import React from "react";

const Section = (props) => {
	const { className } = props;
	return (
		<section className={className}>
			<div
				className={`min-h-screen text-white flex justify-center relative sm:py-0 py-16`}
			>
				<div className="container flex items-center">{props.children}</div>
			</div>
		</section>
	);
};

export default Section;
