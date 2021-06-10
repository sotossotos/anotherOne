const bucket = process.env.bucketName;
import Responses from '../utils/API_Responses';
import fs from 'fs'
import jimp from 'jimp';
import {S3} from '../utils/S3';


/**
 * Creates a new item in bucket based on JSON object
 * 
 * @param { import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {import('../utils/API_Responses')} 
 */
exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.fName) {
        return Responses._400({ message: 'missing the file name from URI path' });
    }

    let fName = event.pathParameters.fName;
    const inData=fs.readFileSync("img/"+fName);

    const outData = await S3.writeImage(inData, `S3-${fName}`, bucket).catch(err => {
        console.log('error in S3 write', err);
        return Responses._500({message: 'Internal S3 Error /POST'});
    });

    if (!outData) {
        return Responses._400({ message: 'Failed to write data by filename' });
    }

    return Responses._200({ outData });
};
