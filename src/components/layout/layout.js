import React from "react";

import Header from "./header/header";

const Layout = (props) => {
	const { children } = props;
	return (
		<>
			<Header siteTitle="" />
			<main>{children}</main>
		</>
	);
};

export default Layout;
