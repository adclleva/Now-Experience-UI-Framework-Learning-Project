import { createHttpEffect } from "@servicenow/ui-effect-http";
import { actionTypes } from "@servicenow/ui-core";
/**
 * COMPONENT_BOOTSTRAPPED is dispatched once after an element is initially connected and bootstrapped.
 * Useful for running setup code, such as fetching resources.
 */
const { COMPONENT_BOOTSTRAPPED } = actionTypes;
import { columns, taskTables } from "./default";
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

export const actionHandlers = {
	[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
		const { dispatch } = coeffects;

		const query = `sys_class_nameIN${taskTables.join(",")}`;

		const fields = columns
			.map((col) => {
				return col.field;
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
		method: "GET",
		queryParams: [
			"sysparm_fields",
			"sysparm_query",
			"sysparm_display_value",
			"sysparm_exclude_reference_link",
		],
		successActionType: "FETCH_TASK_DATA_SUCCEEDED",
	}),
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
	"NOW_EXPERIENCE_FILTER#CHANGED": (coeffects) => {
		const { action, dispatch } = coeffects;
		const { payload } = action;

		const query = `sys_class_nameIN${taskTables.join(",")}^${payload.query}`;

		const fields = columns
			.map((col) => {
				return col.field;
			})
			.join(",");

		dispatch("FETCH_TASK_DATA", {
			sysparm_query: query,
			sysparm_display_value: "all",
			sysparm_exclude_reference_link: true,
			sysparm_fields: fields,
		});
	},
	ROW_CLICKED: (coeffects) => {
		const { dispatch, action, updateState } = coeffects;
		const { sys_id, sys_class_name } = action.payload;

		dispatch("FETCH_TASK_RECORD", {
			id: sys_id,
			table: sys_class_name,
			sysparm_display_value: "all",
			sysparm_exclude_reference_link: true,
		});
	},
	FETCH_TASK_RECORD: createHttpEffect("api/now/table/:table/:id", {
		method: "GET",
		pathParams: ["table", "id"],
		queryParams: ["sysparm_display_value", "sysparm_exclude_reference_link"],
		batch: false,
		successActionType: "FETCH_TASK_RECORD_SUCCEEDED",
	}),
	FETCH_TASK_RECORD_SUCCEEDED: (coeffects) => {
		const { action, updateState } = coeffects;
		const { result } = action.payload;

		const items = Object.keys(result)
			.sort()
			.reduce((acc, val) => {
				acc.push({
					label: val,
					value: {
						type: "string",
						value: result[val].display_value,
					},
				});

				return acc;
			}, []);

		updateState({
			items,
			recordTitle: result.number.display_value,
			recordDetails: result.short_description.display_value,
		});
	},
};

/**
 * an action handler is only handle by one component once but can handle multiple components
 * if the component that it's handling is nested
 * this gives a flux-like unidirectional architecture
 */
