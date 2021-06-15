'use strict'
import Responses from '../utils/API_Responses';
/**
 * 
 * @param { import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {JSON} 
 */
exports.handler = async (event) => {
  let name = String(event.pathParameters.NAME);
  return Responses._200({ message: `Hello User: ${name}`, input: event });
}
