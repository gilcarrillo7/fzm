import React from "react";

const Calendar = (props) => {
	const { text1, text2, day, datestr } = props;
	return (
		<div className="sm:grid sm:grid-cols-2 border-b-2 border-brown py-2">
			<div className="">
				<p className="text-black font-bold text-xl">{text1}</p>
				<p className="text-black font-light text-base">{text2}</p>
			</div>
			<div className="flex sm:flex-col flex-row">
				<p className="text-brown font-light text-2xl sm:text-right">{day}</p>
				<p className="text-brown font-light text-2xl sm:text-right sm:ml-0 ml-auto">
					{datestr}
				</p>
			</div>
		</div>
	);
};

export default Calendar;
