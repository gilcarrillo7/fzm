import React from "react";

const Member = (props) => {
	const { title, img, linktext, url, children } = props;
	return (
		<div className="sm:mb-0 mb-4">
			<img className="m-auto w-full" src={img} alt="FZM" />
			<p className="text-base text-black font-light mt-4">
				{title && <span className="text-brown">{title}&nbsp;</span>}
				{children}
				<a className="text-brown" href={url} target="_blank" rel="noreferrer">
					{linktext}
				</a>
			</p>
		</div>
	);
};

export default Member;
