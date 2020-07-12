import { createCustomElement } from "@servicenow/ui-core";

import styles from "./now-experience-bar-chart.scss";
import "@servicenow/now-heading";

createCustomElement("now-experience-bar-chart", {
	view: (state) => {
		const {
			visualizations,
			chartPadding,
			chartWidth,
			chartHeight,
			barWidth,
			barPadding,
			title,
		} = state.properties;

		const totalHeight = chartHeight + 30;

		return (
			<div className="bar-container">
				<now-heading
					label={title}
					level="5"
					variant="title-tertiary"
				></now-heading>
				<svg
					attrs={{
						width: chartWidth,
						height: totalHeight,
						class: "bar-chart",
					}}
				>
					{visualizations.map((val, i) => {
						const { count } = val;
						const height = count * 5;
						const x = chartPadding + i * (barWidth + barPadding);

						return (
							<g>
								<rect
									attrs={{
										x: x,
										y: chartHeight - height,
										class: "bar",
										fill: "rgb(255, 64, 44)",
										width: barWidth,
										height: height,
									}}
								></rect>
								<text attrs={{ x: x, y: chartHeight }}>
									<tspan attrs={{ dy: "1.5rem" }}>{val.label}</tspan>
								</text>
							</g>
						);
					})}
				</svg>
			</div>
		);
	},
	properties: {
		title: {
			default: "",
		},
		visualizations: {
			default: [],
		},
		chartPadding: {
			default: 10,
		},
		chartWidth: {
			default: 400,
		},
		chartHeight: {
			default: 250,
		},
		barWidth: {
			default: 40,
		},
		barPadding: {
			default: 20,
		},
	},
	styles,
});
