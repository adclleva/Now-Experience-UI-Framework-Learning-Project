import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

const view = (state, { updateState }) => {
	console.log("test");
	return <div></div>;
};

createCustomElement("x-478534-now-experience-dashboard", {
	renderer: { type: snabbdom },
	view,
	styles,
});
