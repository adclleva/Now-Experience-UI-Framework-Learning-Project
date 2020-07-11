// this is essentially the main component that will manage the data

import { createCustomElement } from "@servicenow/ui-core";
import { actionHandlers } from "./actionHandlers.js";

import styles from "./styles.scss";

import "../components/now-experience-table";
import "../components/now-experience-filter";
import "../components/now-experience-record-preview";

import { columns } from "./default";

createCustomElement("snc-now-experience-dashboard", {
	// when this component renders, an action will dispatch

	view: function (state, helpers) {
		const { dataRows, recordTitle, recordDetails, items } = state;

		const displayColumns = columns.filter((col) => {
			return col.field !== "sys_id"; // filter out the sys_id column
		});

		return (
			<div className="container">
				<div className="panel-content">
					<now-experience-record-preview
						items={items}
						recordTitle={recordTitle}
						recordDetails={recordDetails}
					></now-experience-record-preview>
				</div>
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
	actionHandlers: {
		...actionHandlers,
	},
	styles,
});
