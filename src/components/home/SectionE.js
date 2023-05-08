import React, { useMemo, useState, useEffect } from "react";
import Section from "../layout/section/Section";
import Calendar from "../calendar/Calendar";
import flechaI from "../../assets/FLECHA_CAL_IZQUIERDA.png";
import flechaD from "../../assets/FLECHA_CAL_DERECHA-01.png";

const SectionE = (props) => {
	const {
		pagecontent: { title, buttonText, hideButtonText, noEventsText },
		calendar,
	} = props;

	const calendarObj = useMemo(() => {
		if (calendar) {
			let dates = [];
			const calendarObj = new Map();
			const now = new Date();
			calendar.forEach((ev) => {
				const fecha = ev.date.split(" ")[0].split("-");
				const hora = ev.date.split(" ")[1].split(":");
				const date = new Date(
					fecha[0],
					fecha[1] - 1,
					fecha[2],
					hora[0],
					hora[1],
					hora[2]
				);
				//if (date.getMonth() >= now.getMonth())
				dates.push({
					date,
					description: ev.description,
					fecha: `${date.toLocaleDateString("de-DE", { weekday: "short" })} ${
						fecha[1]
					} ${fecha[2]}`,
					hora: `${hora[0]}:${hora[1]} Uhr`,
					url: ev.url,
					urltext: ev.urltext,
				});
			});
			if (dates.length > 0) dates = dates.sort((a, b) => a.date - b.date);
			let mes = now.getMonth();
			let anio = now.getFullYear();

			for (let i = 0; i < 4; i++) {
				calendarObj.set(
					`${mes}-${anio}`,
					dates.filter(
						(d) => d.date.getMonth() === mes && d.date.getFullYear() === anio
					)
				);
				mes = mes === 11 ? 0 : mes + 1;
				anio = mes === 0 ? anio + 1 : anio;
			}

			return calendarObj;
		}
	}, [calendar]);

	const minEvents = 4;
	const [currMonth, setCurrMonth] = useState();
	const [index, setIndex] = useState(0);
	const [max, setMax] = useState(minEvents);

	useEffect(() => {
		if (calendarObj) setCurrMonth([...calendarObj.keys()][index]);
	}, [calendarObj, index]);

	return (
		<Section>
			<div className="flex flex-col w-screen relative sm:mt-12">
				{index !== 0 && (
					<img
						className="absolute left-0 top-0 cursor-pointer w-12 sm:w-18"
						src={flechaI}
						onClick={() => setIndex(index - 1)}
						alt="FZM"
					/>
				)}
				{index !== 3 && (
					<img
						className="absolute right-0 top-0 cursor-pointer w-12 sm:w-18"
						src={flechaD}
						onClick={() => setIndex(index + 1)}
						alt="FZM"
					/>
				)}
				<p className="text-2xl text-black text-center mb-2 font-bold">
					{title && title}
				</p>

				{currMonth && (
					<>
						<Calendar
							date={currMonth}
							events={calendarObj.get(currMonth)}
							noEventsText={noEventsText}
							max={max}
						/>
						{calendarObj.get(currMonth).length > minEvents && (
							<div className="flex justify-center mt-8">
								<button
									onClick={() => setMax(max === 100 ? minEvents : 100)}
									className="bg-transparent text-brown py-4 sm:py-2 px-12 border border-brown font-bold text-xl sm:w-56 w-full text-center"
								>
									{max === 100
										? hideButtonText
											? hideButtonText
											: "Verstecken"
										: buttonText
										? buttonText
										: "Alle zeigen"}
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</Section>
	);
};

export default SectionE;
