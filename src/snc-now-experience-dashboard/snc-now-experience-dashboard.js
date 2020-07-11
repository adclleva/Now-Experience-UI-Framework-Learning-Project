// this is essentially a component that will manage the data

import { createCustomElement } from "@servicenow/ui-core";

import styles from "./styles.scss";

import { columns } from "./default";

import "../components/now-experience-table";
import "../components/now-experience-filter";

import { actionHandlers } from "./actionHandlers";

createCustomElement("snc-now-experience-dashboard", {
	// when this component renders, an action will dispatch
	view: function (state, helpers) {
		const { dataRows } = state;

		const displayColumns = columns.filter((column) => {
			return column.field !== "sys_id"; // filter out the sys_id column
		});
		console.log("dataRows", dataRows);
		return (
			<div className="container">
				<div className="table-content">
					<now-experience-filter></now-experience-filter>
					<now-experience-table
						title="Task table"
						dataColumns={displayColumns}
						dataRows={dataRows}
					></now-experience-table>
				</div>
			</div>
		);
	},
	actionHandlers: { ...actionHandlers },
	styles,
});
