

import Responses from '../utils/API_Responses.js';
import AWS from 'aws-sdk';
/**
 * 
 * @param {import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {JSON}
 */
let topic = process.env.customerCreatedSNS;
exports.handler = async (event) => {

  // console.log(event);
  //console.log(event.Records[0]);
  let sns = new AWS.SNS(
    {
      endpoint: "http://localhost:4002",
      region: "localhost"
    }
  );
  let resPub;
  topic = "arn:aws:sns:localhost:123456789012:" + topic;
  if (event.Records[0].eventName === "INSERT") {
    let itemCustomer = JSON.stringify(event.Records[0].dynamodb.NewImage)

    let objTest = {
      default: itemCustomer,
    }
    objTest = JSON.stringify(objTest);
    try {
      resPub = await sns.publish({

        Message: objTest,
        MessageStructure: 'json',
        TopicArn: topic

      }).promise();

    } catch (err) {
      console.log(`ERROR OCCURED -> ${err}`)
    }
    console.log(resPub)
  }


}
