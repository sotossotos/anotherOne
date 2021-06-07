const Responses = require('../utils/API_Responses');
const S3 = require('../utils/S3');
const bucket = process.env.bucketName;

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
    const inData = JSON.parse(event.body);

    const outData = await S3.write(inData, fName, bucket).catch(err => {
        console.log('error in S3 write', err);
        return Responses._500({message: 'Internal S3 Error /POST'});
    });

    if (!outData) {
        return Responses._400({ message: 'Failed to write data by filename' });
    }

    return Responses._200({ outData });
};
