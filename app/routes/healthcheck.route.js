'use strict'

module.exports = (req, res) => {
	let body = {
		status: 'pass',
		version: '1',
		description: 'An Azure App Service Demo using Azure DevOps and Azure Container Registry (ACR)',
		details: {
			uptime: {
				componentType: 'system',
				observedValue: process.uptime(),
				observedUnit: 's',
				status: 'pass',
				time: new Date()
			}
		}
	}

	// Azure specific variables
	_addEnvVar(body, 'hostname', 'WEBSITE_HOSTNAME')
	_addEnvVar(body, 'instanceId', 'WEBSITE_INSTANCE_ID')

	res.json(body)
}

function _addEnvVar (body, key, varname) {
	if (process.env.hasOwnProperty(varname)) {
		body[key] = process.env[varname]
	}
}

