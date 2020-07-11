import { createCustomElement } from "@servicenow/ui-core";

import styles from "./now-experience-table-styles.scss";

createCustomElement("now-experience-table", {
	view: (state, helpers) => {
		const { dataColumns, dataRows } = state.properties;
		const { dispatch } = helpers;

		return (
			<div className="table-container">
				<table>
					<thead>
						<tr>
							{dataColumns.map((col) => {
								return <th>{col.label}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{dataRows.map((row) => {
							return (
								<tr
									onclick={() => {
										dispatch("ROW_CLICKED", row);
									}}
								>
									{dataColumns.map((col) => {
										return <td>{row[col.field]}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	},
	properties: {
		dataColumns: {
			default: [],
		},
		dataRows: {
			default: [],
		},
	},
	styles,
});
