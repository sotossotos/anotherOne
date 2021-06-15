// const Responses = require('../utils/API_Responses');
// const S3 = require('../utils/S3');

const bucket = process.env.bucketName;
import Responses from '../utils/API_Responses';
import { S3 } from '../utils/S3';


/**
 * Creates a new item in bucket based on JSON object
 * 
 * @param { import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {import('../utils/API_Responses')} 
 */
exports.handler = async event => {

  // if (!event.pathParameters || !event.pathParameters.fName) {
  //     return Responses._400({ message: 'missing the file name from URI path' });
  // }

  // const inData = JSON.parse(event.body);
  const inData = inputCheck(event);
  if (inData.statusCode) { return inData }
  let fName = event.pathParameters.fName;
  const outData = await S3.write(inData, fName, bucket).catch(err => {
    console.log('error in S3 write', err);
    return Responses._500({ message: 'Internal S3 Error /POST' });
  });

  if (!outData) {
    return Responses._400({ message: 'Failed to write data by filename' });
  }

  return Responses._200({ outData });
};
/**
 * 
 * @param {*} event 
 * @returns {Responses||JSON}
 */
export let inputCheck = event => {
  if (!event.pathParameters || !event.pathParameters.fName) {
    return Responses._400({ message: 'missing the file name from URI path' });
  }
  let fileParts = event.pathParameters.fName.split(".");
  if (fileParts.length !== 2) {
    return Responses._400({ message: 'Provided file is not supported' });
  }
  if (fileParts.length === 2 && fileParts[1] === "json") {
    return JSON.parse(event.body);
  } else {
    return Responses._400({ message: 'Provided file is not supported' });
  }



}
