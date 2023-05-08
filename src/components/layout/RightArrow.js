import React from "react";

const RightArrow = ({ className, onClick, color }) => {
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
				d="M1.23999 43.5C1.10999 43.5 0.97999 43.45 0.88999 43.35C0.68999 43.15 0.68999 42.84 0.88999 42.64L21.47 22.06L0.88999 1.48C0.68999 1.28 0.68999 0.969995 0.88999 0.769995C1.08999 0.569995 1.39999 0.569995 1.59999 0.769995L22.89 22.06L1.58999 43.35C1.49999 43.45 1.36999 43.5 1.23999 43.5Z"
				fill={color ? color : "white"}
			/>
		</svg>
	);
};

export default RightArrow;
