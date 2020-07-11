import { createCustomElement } from "@servicenow/ui-core";

import styles from "./now-experience-record-preview.scss";

import "@servicenow/now-label-value";
import "@servicenow/now-heading";

createCustomElement("now-experience-record-preview", {
	view: (state, helpers) => {
		const { label, properties } = state;
		const { items } = properties;

		return (
			<div classname="card-container">
				<div className="card">
					<now-heading label={label} level="6" variant="title-secondary" />
					<now-label-value-stacked size="sm" items={items} />
				</div>
			</div>
		);
	},
	transformState: (state) => {
		const { recordTitle, recordDetails } = state.properties;
		if (!recordTitle) {
			return state;
		}

		return {
			...state,
			label: `${recordTitle} - ${recordDetails}`,
		};
	},
	initialState: {
		label: "Please select a record",
	},
	properties: {
		items: {
			default: [],
		},
		recordTitle: {
			default: "",
		},
		recordDetails: {
			default: "",
		},
	},
	styles,
});
