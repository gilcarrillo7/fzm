import React from "react";
import PageLayout from "../components/layout/page-layout";

import Img from "../assets/FZM_img-pjt-ilu2_page.png";

const Gruppen = () => {
	const title = "Gruppen";
	const p =
		"Das FZM* fördert die Organisation von selbstorganisierten Gruppen von Migrant*innen, geflüchtete Frauen* und Frauen* mit Migrations- und Fluchtbiografie nach ihren Interessen und Bedürfnissen. Falls ihr Interesse habt eine selbstorganisierte Gruppe zu gründen, meldet euch bei uns. ";
	return <PageLayout title={title} p={p} img={Img} />;
};

export default Gruppen;
