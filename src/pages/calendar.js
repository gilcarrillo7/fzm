import React from "react";
import Calendar from "../components/layout/calendar";
import Layout from "../components/layout/layout";
const CalendarPage = () => {
	return (
		<Layout>
			<div className="min-h-screen flex flex-col">
				<div className="text-white flex justify-center relative mt-auto">
					<div className="container pt-20 pb-12">
						<p className="text-xl text-brown font-medium mb-4">Calendar</p>
						<div className="m-auto lg:px-36 md:px-18 sm:px-9">
							<Calendar
								text1="In-side-migrant*innen"
								text2="In “in-side-migrant*innen” geht es."
								day="Thursday"
								datestr="04 12"
							/>
							<Calendar
								text1="Migrant women* artists"
								text2="Diese Reihe sucht die Sichtbarkeit."
								day="Friday"
								datestr="03 12"
							/>
							<Calendar
								text1="Empowerment-Workshops"
								text2="In “in-side-migrant*innen” geht es."
								day="Saturday"
								datestr="04 12"
							/>
							<Calendar
								text1="In-side-migrant*innen"
								text2="Geplant werden Empowerment"
								day="Sunday"
								datestr="05 12"
							/>
						</div>
					</div>
				</div>
				<div className="bg-brown mt-auto flex justify-center">
					<div className="container">
						<p className="text-white text-center text-sm pt-4 pb-8">
							Registergericht: Berlin-Charlottenburg Registernummer: VR 38852 V
							Steuernummer: 27/653/59657 Vorsitzenden*: Kamilla Jarzina, Hernán
							Marchese, Jeruna Tiemann
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CalendarPage;
