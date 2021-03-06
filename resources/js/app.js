require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById("app")
);
