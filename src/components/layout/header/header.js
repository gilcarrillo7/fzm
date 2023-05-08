import React, { useContext } from "react";
import classNames from "classnames";
import { Link } from "gatsby";
import Helmet from "react-helmet";

import { AppContext } from "../../../context/AppContext";

import Menu from "../menu/menu";

import "./header.scss";

//import Logo from "../../../assets/FZM_logo.svg";

const Header = () => {
	const { menuOpen, setMenuOpen, logoUrl, instagramUrl, logoIg } =
		useContext(AppContext);

	return (
		<>
			<Helmet
				bodyAttributes={{
					class: `${menuOpen ? "overflow-hidden" : ""}`,
				}}
			/>
			<header className="fixed w-full z-30">
				<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-2 sm:p-6">
					<div className="flex items-center flex-shrink-0 text-white mr-6">
						{logoUrl !== "" && (
							<Link to="/">
								<img src={logoUrl} alt="FZM" className="w-40 md:w-52" />
							</Link>
						)}
					</div>
					<div className="flex flex-column items-center">
						{instagramUrl !== "" && (
							<a
								className="h-full flex justify-center"
								href={instagramUrl}
								target="_blank"
								rel="noreferrer"
							>
								<img src={logoIg} alt="Instagram" className="w-10 mr-2" />
							</a>
						)}
						<button
							className={classNames({ open: menuOpen }, "menu")}
							onClick={() => setMenuOpen(!menuOpen)}
						>
							<div className="icon-left"></div>
							<div className="icon-right"></div>
						</button>
					</div>
				</nav>
			</header>
			<div
				className={`bg-menu min-h-screen min-w-full bg-white fixed z-10 ${
					menuOpen ? "open" : ""
				}`}
			></div>
			<Menu />
		</>
	);
};

export default Header;
