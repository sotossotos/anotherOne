
import AWS from 'aws-sdk';
/**
 * 
 * @param {import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * 
 */
let topic = process.env.customerCreatedSNS;
const handler = async (event) => {

  let sns = new AWS.SNS(
    {
      endpoint: `http://${process.env.host}:${process.env.snsPort}`,
      region: "localhost"
    }
  );
  let resPub;
  topic = `arn:aws:sns:${process.env.host}:123456789012:${topic}`;
  if (event.Records[0].eventName === "INSERT") {
    const itemCustomer = JSON.stringify(event.Records[0].dynamodb.NewImage)

    let objTest = JSON.stringify({ default: itemCustomer });
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
export { handler }
