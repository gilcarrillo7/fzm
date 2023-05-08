import React, { useMemo } from "react";
import Event from "./Event";

const Calendar = ({ date, events, noEventsText, max }) => {
	const { month, year } = useMemo(() => {
		const fecha = new Date();
		fecha.setMonth(date.split("-")[0]);
		return {
			month: fecha.toLocaleDateString("de-DE", { month: "long" }),
			year: date.split("-")[1],
		};
	}, [date]);

	console.log(events);
	return (
		<>
			<p className="text-2xl text-brown text-center mb-6">
				{month} {year}
			</p>
			<div className="w-full divide-y">
				{events.length ? (
					events.map(
						(event, i) => i < max && <Event key={`event${i}`} event={event} />
					)
				) : (
					<p className="text-xl text-black text-center">
						{noEventsText ? noEventsText : "Keine Ereignisse"}
					</p>
				)}
			</div>
		</>
	);
};

export default Calendar;
