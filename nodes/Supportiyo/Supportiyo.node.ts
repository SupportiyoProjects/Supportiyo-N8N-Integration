import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Supportiyo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Supportiyo',
		name: 'supportiyo',
		icon: 'file:Supportiyo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Supportiyo API',
		defaults: {
			name: 'Supportiyo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'supportiyoApi',
				required: true,
			},
		],
		properties: [
			// Resource
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Appointment',
						value: 'appointment',
					},
				],
				default: 'appointment',
			},

			// Operation
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['appointment'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Retrieve all appointments',
						action: 'Get all appointments',
					},
				],
				default: 'getAll',
			},

			// Filters
			{
				displayName: 'Business Info ID',
				name: 'business_info_id',
				type: 'string',
				default: '',
				description: 'Filter by business info ID',
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAll'],
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Filter by appointment status',
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAll'],
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Filter appointments starting from this date',
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAll'],
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				default: '',
				description: 'Filter appointments up to this date',
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAll'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 10,
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAll'],
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip (for pagination)',
				typeOptions: {
					minValue: 0,
				},
				displayOptions: {
					show: {
						resource: ['appointment'],
						operation: ['getAll'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('supportiyoApi');

		const baseUrl = 'https://us-east-manhattan.fly.dev';
		const apiKey = credentials.apiKey as string;

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let responseData: INodeExecutionData[] = [];

		if (resource === 'appointment' && operation === 'getAll') {
			const limit = this.getNodeParameter('limit', 0) as number;
			const offset = this.getNodeParameter('offset', 0) as number;
			const businessInfoId = this.getNodeParameter('business_info_id', 0) as string;
			const status = this.getNodeParameter('status', 0) as string;
			const startDate = this.getNodeParameter('start_date', 0) as string;
			const endDate = this.getNodeParameter('end_date', 0) as string;

			const qs: IDataObject = { limit, offset };

			if (businessInfoId) qs.business_info_id = businessInfoId;
			if (status) qs.status = status;
			if (startDate) qs.start_date = startDate;
			if (endDate) qs.end_date = endDate;

			const queryString = Object.entries(qs)
				.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
				.join('&');

			const response = await this.helpers.httpRequest({
				method: 'GET',
				url: `${baseUrl}/calendar/appointments?${queryString}`,
				headers: {
					Authorization: `Bearer ${apiKey}`,
					Accept: 'application/json',
				},
			});

			const appointments = response.appointments ?? response;
			responseData = this.helpers.returnJsonArray(appointments);
		}

		return [responseData];
	}
}
