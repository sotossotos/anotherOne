
// First try of creating lambda

import Responses from '../utils/API_Responses.js';
/**
 * 
 * @param {import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {JSON}
 */
exports.handler = async (event) => {
  return Responses._200({ statusCode: 'success', message: 'AnotherOne is Running !', input: event });
}

