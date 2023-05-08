import React from "react";
import PageLayout from "../components/layout/page-layout";

import Img from "../assets/FZM_img-pjt-ilu1_page.png";

const Veranstaltungen = () => {
	const title = "Veranstaltungen";
	const p =
		"Das FZM* engagiert sich für die Umsetzung eines vielfältiges feministisches Programm mit   mit dem Fokus auf intersektioneller feministischer politischer Bildung, Frauenempowerment-Arbeit und Kunst als Tool für Selbstermächtigung und Transformation. Wir organisieren regelmäßige Vorträge, Workshops, Lesungen, Ausstellungen, Gesprächsrunden, Fachgespräche und Podiumsdiskussionen. Schwerpunkte sind u.a.: Feminismen, antirassistische sowie Antidiskriminierungsarbeit, Migrationserfahrungen, autobiografische Arbeit, Self-Care, Gesundheit und der Aufbau von solidarischen Netzwerken.";

	return <PageLayout title={title} p={p} img={Img} />;
};

export default Veranstaltungen;
