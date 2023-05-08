import React from "react";

const Event = ({ event }) => {
	const { description, fecha, hora, url, urltext } = event;
	return (
		<div className="text-black text-xl py-3 flex flex-col sm:flex-row">
			<div className="flex w-full sm:w-2/5">
				<div className="w-1/2">
					<span className="font-bold">{fecha.split(" ")[0]}</span>&nbsp;
					{fecha.split(" ")[1]}&nbsp;
					{fecha.split(" ")[2]}&nbsp;
				</div>
				<div className="w-1/2 font-bold text-right sm:text-left">{hora}</div>
			</div>
			<div className="w-full sm:w-3/5">
				<p>{description}</p>
				{url && url !== "" && (
					<a className="text-brown" href={url} target="_blank" rel="noreferrer">
						{urltext ? urltext : url}
					</a>
				)}
			</div>
		</div>
	);
};

export default Event;
