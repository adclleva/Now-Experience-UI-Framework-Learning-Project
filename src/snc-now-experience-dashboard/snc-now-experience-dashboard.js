// this is essentially a component that will manage the data
// that level provider

import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http"; // this will provide us an api to fetch data from our instance

import styles from "./styles.scss";

import { columns, taskTables } from "./default";

import "../components/now-experience-table";

/**
 * COMPONENT_BOOTSTRAPPED is dispatched once after an element is initially connected and bootstrapped.
 * Useful for running setup code, such as fetching resources.
 */
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

createCustomElement("snc-now-experience-dashboard", {
	// when this component renders, an action will dispatch
	view: function (state, helpers) {
		const { dataRows } = state;

		const displayColumns = columns.filter((column) => {
			return column.field !== "sys_id"; // filter out the sys_id column
		});

		return (
			<div className="container">
				<now-experience-table
					title={"Task table"}
					dataColumns={displayColumns}
					dataRows={dataRows}
				/>
			</div>
		);
	},
	/**
	 * Deep dive: The createHttpEffect method accepts two arguments - the URL and a configuration object. We configuring the method, queryParams, and successActionType parameters:
	 * method: GET, because we are returning a list of task records from the server.
	 * queryParams:
	 * sysparm_fields ensures we are only returning the fields we want data from
	 * sysparm_query is the query string, ie active=true
	 * sysparm_display_value means we want the display value for each field
	 * sysparm_exclude_reference_link allows us to toggle reference links
	 * successActionType: the action that is dispatched once the request has successfully completed.
	 *
	 * when the compnent gets rendered on the page, we would want to fetch the data
	 */
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;
			const query = `sys_class_nameIN${taskTables.join(",")}`;
			const fields = columns
				.map((column) => {
					return column.field;
				})
				.join(",");

			dispatch("FETCH_TASK_DATA", {
				sysparm_query: query,
				sysparm_display_value: "all",
				sysparm_exclude_reference_link: true,
				sysparm_fields: fields,
			});
		},
		FETCH_TASK_DATA: createHttpEffect("api/now/table/task", {
			// this is an action handler that will send a request to the server
			method: "Get",
			queryParams: [
				"sysparm_fields",
				"sysparm_query",
				"sysparm_display_value",
				"sysparm_exclude_reference_link",
			],
			successActionType: "FETCH_TASK_DATA_SUCCEEDED",
		}),

		/**
		 * this will process the results from our request,
		 * and update the state of our component with these results
		 */
		FETCH_TASK_DATA_SUCCEEDED: (coeffects) => {
			const { action, updateState } = coeffects;
			const { result } = action.payload;

			const dataRows = result.map((row) => {
				return Object.keys(row).reduce((acc, val) => {
					if (val === "sys_class_name") {
						acc[val] = row[val].value;
					} else {
						acc[val] = row[val].display_value;
					}

					return acc;
				}, {});
			});

			updateState({ dataRows });
		},
	},
	styles,
});

/**
 * an action handler is only handle by one component once but can handle multiple components
 * if the component that it's handling is nested
 * this gives a flux-like unidirectional architecture
 */
