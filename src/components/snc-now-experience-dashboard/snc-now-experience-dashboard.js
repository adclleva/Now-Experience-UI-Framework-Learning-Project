import { createCustomElement } from "@servicenow/ui-core";

import styles from "./styles.scss";

import { columns } from "./default";

createCustomElement("snc-now-experience-dashboard", {
	view: function (state, helpers) {
		return <div className="container"></div>;
	},
	actionHandlers: {},
	styles,
});
