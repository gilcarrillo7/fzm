import React, { useContext } from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from "gatsby";

import { AppContext } from "../../../context/AppContext";

import "./menu.scss";

const Menu = () => {
	const { menuOpen, setMenuOpen, menuItems, setCurrSection } =
		useContext(AppContext);

	return (
		<div
			className={`${
				!menuOpen ? "invisible" : ""
			} min-h-screen min-w-full flex items-center justify-center fixed z-10 `}
		>
			<div className="container">
				<div className="flex justify-center">
					<div className="text-center items-center">
						<ul
							className={`${
								menuOpen ? "open" : ""
							} ul-menu m-auto flex flex-col`}
						>
							{menuItems.map((item, i) => (
								<li key={item} className="py-2">
									{i !== 6 ? (
										<AnchorLink
											to={`/#section${i + 1}`}
											onAnchorLinkClick={() => {
												setCurrSection(i + 1);
												setMenuOpen(false);
											}}
										>
											{item}
										</AnchorLink>
									) : (
										<Link to="/press" onClick={() => setMenuOpen(false)}>
											{item}
										</Link>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/*currSection > 1 && (
				<div
					className={classNames(
						{ open: menuOpen },
						"circle fixed z-20 h-80 w-80 sm:h-96 sm:w-96"
					)}
				></div>
                    )*/}
		</div>
	);
};

export default Menu;
