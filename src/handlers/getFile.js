// const Responses = require('../utils/API_Responses');
// const S3 = require('../utils/S3');
import Responses from '../utils/API_Responses';
import { S3 } from '../utils/S3';

const bucket = process.env.bucketName;
/**
 * 
 * @param {*} event 
 * @returns 
 */
const handler = async event => {
  if (!event.pathParameters || !event.pathParameters.fName) {
    // failed without an fileName
    return Responses._400({ message: 'missing the fileName from the path' });
  }

  let fName = event.pathParameters.fName;

  const file = await S3.get(fName, bucket).catch(err => {
    console.log('error in S3 get', err);
    return Responses._500({ message: 'S3 Internal Error /GET' });
  });

  if (!file) {
    return Responses._404({ message: 'Failed to read data by filename' });
  }

  return Responses._200(file);
};

export { handler }
