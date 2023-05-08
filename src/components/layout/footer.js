import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";

const Footer = () => {
	const { footerText } = useContext(AppContext);

	return (
		<div className="bg-brown mt-auto flex p-2 sm:p-6">
			<div className="w-screen pb-6 sm:pt-0 pt-4 text-white text-sm flex grid md:grid-cols-2">
				<div>
					{footerText && (
						<p className="text-left">
							{footerText.footer1}
							<br /> {footerText.footer2} <br />
							{footerText.footer3} <br />
							{footerText.footer4}
						</p>
					)}
				</div>
				<div className="flex md:justify-end mt-4 md:mt-0">
					<div className="sm:text-right text-left md:text-center inline-flex place-items-end">
						Design und Entwicklung von&nbsp;
						<a
							href="https://www.trazovivo.com"
							target="_blank"
							rel="noreferrer"
						>
							Trazo Vivo
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
