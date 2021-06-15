'use strict'
// const Responses = require('../utils/API_Responses');
// const AWS = require("aws-sdk");
import Responses from '../utils/API_Responses';
import AWS from 'aws-sdk';
/**
 * 
 * @param { import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {JSON} 
 */
exports.handler = async (event) => {
  let name = String(event.pathParameters.NAME);
  return Responses._200({ message: `Hello User: ${name}`, input: event });
}
