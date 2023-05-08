import React from "react";
import PageLayout from "../../components/layout/page-layout";

import Img from "../../assets/FZM_img-pjt-sec1x2_3.png";

const Empowerment = () => {
	const title = "Empowerment-Workshops";
	const p =
		"Geplant werden Empowerment-Workshops mit dem Fokus auf die Selbstermächtigung, Teilhabe, Repräsentation und Austausch von Migrant*innen auf lokaler Ebene. Schwerpunkte sind: Empowerment, rassismuskritische Arbeit, Antidiskriminierungsarbeit, Inklusion, Gedächtnis, Self-Care, Gesundheit und Sexualität, u.a. Nächste Workshopreihe: Autobiografischer feministischer Schreibkurs Benennen um zu existieren. Ein Autobiografischer Schreibkurs mit dem Fokus auf unserer eigenen Geschichte im Rahmen eines Migrationsprozesses. Zusammen mit den Teilnehmer*innen wird einen kollektiven Raum für Schreiben, Sichtbarkeit und Gedächtnis aufgebaut. (Siehe Kalender für die nächsten Termine).";
	return <PageLayout title={title} p={p} img={Img} />;
};

export default Empowerment;
