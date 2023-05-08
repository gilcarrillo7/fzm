import React from "react";
import PageLayout from "../components/layout/page-layout";

import Img from "../assets/FZM_img-pjt-ilu3_page.png";

const Beratungen = () => {
	const title = "Beratungen";
	const p =
		"Das FZM* bietet soziale und psychologiche Beratung für Migrant*innen, gefluchtete Frauen* und in verschiedenen Sprachen an. Wir arbeiten mit verschiedenen Fachstellen zusammen. Schwerpunkte sind u.a.: Migrationsprozesse, ";

	return <PageLayout title={title} p={p} img={Img} />;
};

export default Beratungen;
