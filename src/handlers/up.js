'use strict'
// First try of creating lambda
const Responses = require('../utils/API_Responses');
const AWS = require("aws-sdk");
/**
 * 
 * @param {import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {JSON}
 */
exports.handler = async (event) => {
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(
    //     {
    //       message: 'AnotherOne is Running !',
    //       input: event,
    //     },
    //     null,
    //     2
    //   ),
    // }
    return Responses._200({message:'AnotherOne is Running !',input: event});
  }
