import { createCustomElement } from "@servicenow/ui-core";

import styles from "./now-experience-table-styles.scss";

createCustomElement("now-experience-table", {
	view: (state, helpers) => {
		const { dataColumns, dataRows, title } = state.properties;
		console.log("state", state);
		const { dispatch } = helpers;

		return (
			<div className="table-container">
				<h1 style={{ color: "red" }}>{title}</h1>
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
	/**
	 * properties need to be unique and not a HTML property
	 * properties can be any type of data-structure while attributes are only strings
	 */
	properties: {
		dataColumns: {
			default: [],
		},
		dataRows: {
			default: [],
		},
		title: {
			default: "",
		},
	},
	styles,
});

/**
 * API: Properties
The following features are available for properties:

const properties = {
    name: {
        // The default value of the property
        default: 'Fred',
        // reflected to the current HTML attribute, useful for accessibility
        reflect: true
        // 
        computed: (state) => {
            const { name } = state.properties;

            return `Hi {name}!`;
        }
    }
}
 */
