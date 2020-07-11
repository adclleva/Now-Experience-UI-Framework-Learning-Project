// this file will contain default values for our dashboard
export const taskTables = [
	"incident",
	"problem",
	"incident_task",
	"problem_task",
];

export const tableLabels = {
	incident: "Incidents",
	problem: "Problems",
	problem_task: "PRB Tasks",
	incident_task: "INT Tasks",
};

export const columns = [
	{
		field: "number",
		label: "Number",
	},
	{
		field: "state",
		label: "State",
	},
	{
		field: "priority",
		label: "Priority",
	},
	{
		field: "short_description",
		label: "Short Description",
	},
	{
		field: "description",
		label: "Description",
	},
	{
		field: "assigned_to",
		label: "Assigned to",
	},
	{
		field: "opened_at",
		label: "Opened at",
	},
	{
		field: "sys_id",
		label: "Sys id",
	},
	{
		field: "sys_class_name",
		label: "Task type",
	},
];
