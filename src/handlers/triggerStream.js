

import Responses from '../utils/API_Responses.js';
import AWS from 'aws-sdk' ;
/**
 * 
 * @param {import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {JSON}
 */
exports.handler = async (event) => {
    console.log(event);
    console.log(event.Records[0]);
  }
