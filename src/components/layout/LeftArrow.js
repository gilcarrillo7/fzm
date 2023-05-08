import React from "react";

const LeftArrow = ({ className, onClick, color }) => {
	return (
		<svg
			width="23"
			height="44"
			viewBox="0 0 23 44"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			onClick={onClick}
		>
			<path
				d="M22.38 0.630005C22.51 0.630005 22.64 0.680005 22.73 0.780005C22.93 0.980005 22.93 1.29 22.73 1.49L2.14999 22.06L22.73 42.64C22.93 42.84 22.93 43.15 22.73 43.35C22.53 43.55 22.22 43.55 22.02 43.35L0.73999 22.06L22.03 0.780005C22.12 0.680005 22.25 0.630005 22.38 0.630005Z"
				fill={color ? color : "white"}
			/>
		</svg>
	);
};

export default LeftArrow;
