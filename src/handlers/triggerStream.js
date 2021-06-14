

import Responses from '../utils/API_Responses.js';
import AWS from 'aws-sdk' ;
/**
 * 
 * @param {import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {JSON}
 */
 let topic = process.env.customerCreatedSNS;
exports.handler = async (event) => {
    
    // console.log(event);
    console.log(event.Records[0].eventName);
    let sns= new AWS.SNS(
      {
      endpoint:"http://127.0.0.1:4002",
      region: "eu-west-1"
    }
    );
    let resPub;
    topic="arn:aws:sns:eu-west-1:123456789012:"+topic;
    try{
      resPub=await sns.publish({
        
        Message: "New Customer Created,you must send Welcome Email",
        TopicArn: topic
        
      }).promise();

    }catch(err){
      console.log(`ERROR OCCURED -> ${err}`)
    }
    console.log(resPub)
    
  }
