import React from "react";

import Footer from "../layout/footer";

const SectionG = (props) => {
	const {
		pagecontent: { title, content },
		uri,
		imgUrls,
	} = props;

	return (
		<section>
			<div className="min-h-screen flex flex-col">
				<div className="sm:mt-32 text-white flex justify-center relative">
					<div className="container">
						<div className="flex justify-center flex-col">
							<p className="text-2xl text-brown text-center mb-12">
								{title && title}
							</p>
							<div className="flex flex-wrap justify-around mb-12">
								{imgUrls.map(
									(img) =>
										img.imgUrl && (
											<div className="" key={img.img}>
												<img className="mb-4" src={img.imgUrl} alt="FZM" />
											</div>
										)
								)}
							</div>
							<p className="text-brown text-center text-2xl my-6">
								{content && content}
							</p>
							<div className="w-full flex">
								<div className="flex-1 flex align-center">
									{uri && <img className="m-auto" src={uri} alt="FZM" />}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</section>
	);
};

export default SectionG;
