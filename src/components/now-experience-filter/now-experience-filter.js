import { createCustomElement } from "@servicenow/ui-core";

import styles from "./now-experience-filter.scss";

import "@servicenow/now-button";

createCustomElement("now-experience-filter", {
	view: (state, helpers) => {
		const { dispatch } = helpers;
		const { query } = state;

		return (
			<div className="filter-container">
				<div className="input-input-container">
					<input
						className="input -lg"
						value={query}
						on-input={(e) => {
							dispatch("FILTER_CHANGED", {
								value: e.target.value,
							});
						}}
					></input>
					<now-button
						label="Run Query"
						size="sm"
						variant="tertiary"
						append-to-payload={{ type: "run" }}
					></now-button>
					<now-button
						label="Clear Query"
						size="sm"
						variant="tertiary"
						append-to-payload={{ type: "clear" }}
					></now-button>
				</div>
			</div>
		);
	},
	actionHandlers: {
		FILTER_CHANGED: ({ action, updateState }) => {
			const { value } = action.payload;

			updateState({
				query: value,
			});
		},
		"NOW_BUTTON#CLICKED": ({ action, dispatch, state, updateState }) => {
			const { type } = action.payload;
			const query = type === "clear" ? "" : state.query;

			updateState({ query });
			dispatch("NOW_EXPERIENCE_FILTER#CHANGED", { query });
		},
	},
	initialState: {
		query: "",
	},
	properties: {},
	styles,
});
