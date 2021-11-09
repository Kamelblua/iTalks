import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { fr } from "moment/locale/fr";

import App from "./App";

import "./assets/styles/reset.css";
import "./assets/styles/fonts.css";
import "./assets/styles/main.css";

moment(fr);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("core")
);
