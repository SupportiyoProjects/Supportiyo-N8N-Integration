import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SupportiyoApi implements ICredentialType {
	name = 'supportiyoApi';
	displayName = 'Supportiyo API';
	documentationUrl = 'https://supportiyo.com';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your Supportiyo API key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://us-east-manhattan.fly.dev',
			url: '/calendar/appointments',
			method: 'GET',
			qs: {
				limit: 1,
			},
		},
	};
}
