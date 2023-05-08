import React from "react";
import Seo from "../seo";
import Footer from "./footer";
import Layout from "./layout";

const PageLayout = (props) => {
	const { title, p, img, linktext, url } = props;
	return (
		<Layout>
			<Seo title={`FZM - ${title}`} />
			<div className="min-h-screen flex flex-col pt-24 sm:pt-0">
				<div className="sm:mt-28 mt-24 text-white flex justify-center relative mt-auto">
					<div className="container pb-12">
						<div className="flex flex-col sm:flex-row">
							<div className="sm:w-1/3 sm:order-2 sm:mb-0 mb-6 sm:pl-12 lg:pl-20">
								{img && <img className="m-auto w-full" src={img} alt="FZM" />}
							</div>
							<div className="sm:w-2/3 sm:order-1 sm:pr-8">
								<p className="text-3xl text-brown font-extralight">
									{title}
								</p>
								<p className="text-base text-black font-light mt-4">{p}</p>
								<p className="text-base font-light underline mt-4">
									<a
										className="text-brown"
										href={url}
										target="_blank"
										rel="noreferrer"
									>
										{linktext}
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</Layout>
	);
};

export default PageLayout;
