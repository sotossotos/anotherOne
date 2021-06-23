'use strict'
import Responses from '../utils/API_Responses';
/**
 * 
 * @param { import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns { Responses } 
 */
const handler = async (event) => {
  const name = String(event.pathParameters.NAME);
  return Responses._200({ message: `Hello User: ${name}`, input: event });
}
export { handler }
