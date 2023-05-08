import React from "react";

import { AppProvider } from "./src/context/AppContext";
import "./src/styles/global.scss";

export const wrapRootElement = ({ element }) => (
	<AppProvider>{element}</AppProvider>
);
