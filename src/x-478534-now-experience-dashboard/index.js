import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

import "../components/snc-now-experience-dashboard/";

const view = (state, { updateState }) => {
	console.log("test");
	return (
		<div>
			<h1>Task Dashboard</h1>
			<snc-now-experience-dashboard />
		</div>
	);
};

createCustomElement("x-478534-now-experience-dashboard", {
	renderer: { type: snabbdom },
	view,
	styles,
});
