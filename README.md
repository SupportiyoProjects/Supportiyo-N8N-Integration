# n8n-nodes-supportiyo

This is an n8n community node that lets you use the [Supportiyo](https://supportiyo.com) API in your n8n workflows.

Supportiyo is a scheduling and appointment management platform. This node allows you to retrieve appointment data and use it in your automations.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Credentials

To use this node, you need a Supportiyo API key. Set up your credentials with:

- **API Key** — Your personal Supportiyo API key

## Operations

### Appointment

- **Get All** — Retrieve all appointments with optional filters

### Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| Business Info ID | String | Filter by business |
| Status | String | Filter by appointment status |
| Start Date | DateTime | Filter from this date |
| End Date | DateTime | Filter up to this date |
| Limit | Number | Max results to return (default: 10) |
| Offset | Number | Number of results to skip for pagination |

## Compatibility

Tested with n8n version 1.x.

## License

[MIT](https://opensource.org/licenses/MIT)
