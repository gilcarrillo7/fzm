import React, { useState } from "react";
import axios from "axios";
import Section from "../layout/section/Section";
import { BeatLoader } from "react-spinners";

const convertJsontoUrlencoded = (obj) => {
	let str = [];
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
		}
	}
	return str.join("&");
};

const SectionF = (props) => {
	const {
		pagecontent: {
			title,
			buttonText,
			address,
			mail,
			successmessage,
			errormessage,
		},
	} = props;
	const TOKEN ="";

	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [loading, setLoading] = useState(false);
	const [formMessage, setFormMessage] = useState("");

	const sendForm = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios({
				url: `https://fzm-berlin.com/wp/wp-json/contact-form-7/v1/contact-forms/269/feedback`,
				headers: {
					Authorization: `Basic ${TOKEN}`,
					"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
				},
				method: "POST",
				data: convertJsontoUrlencoded({
					["your-subject"]: "Contact",
					["your-name"]: form.name,
					["your-email"]: form.email,
					["your-message"]: form.message,
				}),
			});
			setLoading(false);
			setFormMessage(
				successmessage ? successmessage : "Danke für deine nachricht"
			);
			setForm({ name: "", email: "", message: "" });
		} catch (error) {
			setLoading(false);
			setFormMessage(
				errormessage ? errormessage : "Ein fehler ist aufgetreten"
			);
		}
	};

	const handleChanges = (e) => {
		e.preventDefault();
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<Section>
			<div className="flex flex-col sm:mt-12">
				<div className="text-white flex justify-center relative">
					<div className="flex justify-center flex-col">
						<p className="text-4xl text-brown">{title && title}</p>
						<form
							className="w-full text-black sm:mt-12 mt-4"
							onSubmit={(e) => sendForm(e)}
						>
							<div className="sm:grid sm:grid-cols-2 sm:gap-12 ">
								<div className="flex flex-col items-center py-2 mt-4 sm:mt-0">
									<input
										name="name"
										className="appearance-none bg-transparent border-b border-brown w-full mr-3 py-1 px-2 focus:outline-none"
										type="text"
										placeholder="Name"
										aria-label="Name"
										value={form.name}
										onChange={(e) => handleChanges(e)}
									/>
								</div>
								<div className="flex flex-col items-center py-2 mt-4 sm:mt-0">
									<input
										name="email"
										className="appearance-none bg-transparent border-b border-brown w-full mr-3 py-1 px-2 focus:outline-none"
										type="mail"
										placeholder="Email"
										aria-label="Email"
										value={form.email}
										onChange={(e) => handleChanges(e)}
									/>
								</div>
							</div>
							<div className="sm:grid sm:grid-cols-2 sm:gap-12 sm:mt-16 ">
								<div className="flex flex-col items-center py-2 mt-4 sm:mt-0">
									<input
										name="message"
										className="appearance-none bg-transparent border-b border-brown w-full mr-3 py-1 px-2 focus:outline-none"
										type="tel"
										placeholder="Nachricht"
										aria-label="Nachricht"
										value={form.message}
										onChange={(e) => handleChanges(e)}
									/>
								</div>
								<div className="text-center sm:text-left sm:my-0 my-4">
									{loading ? (
										<BeatLoader color="#966846" />
									) : formMessage === "" ? (
										<button
											type="submit"
											className="bg-transparent text-brown py-4 sm:py-2 px-12 border border-brown font-bold text-xl sm:w-56 w-full text-center"
										>
											{buttonText ? buttonText : "Senden"}
										</button>
									) : (
										<p className="text-brown text-left text-base">
											{formMessage}
										</p>
									)}
								</div>
							</div>
						</form>
						<p className="text-brown text-left text-base my-6">
							{address &&
								address.split("\r\n").map((txt) => (
									<React.Fragment key={txt}>
										{txt}
										<br />
									</React.Fragment>
								))}
							{mail && <a href={`mailto:${mail}`}>{mail}</a>}
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default SectionF;
