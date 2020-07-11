// this is essentially a component that will manage the data
// that level provider

import { createCustomElement } from "@servicenow/ui-core";

import styles from "./styles.scss";

import { columns } from "./default";

import "../components/now-experience-table";

createCustomElement("snc-now-experience-dashboard", {
	view: function (state, helpers) {
		const displayColumns = columns.filter((column) => {
			return column.field !== "sys_id"; // filter out the sys_id column
		});

		return (
			<div className="container">
				<now-experience-table
					title={"Test table"}
					dataColumns={displayColumns}
					dataRows={[]}
				/>
			</div>
		);
	},
	actionHandlers: {},
	styles,
});
