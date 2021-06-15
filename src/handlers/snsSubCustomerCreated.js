
import AWS from 'aws-sdk'
const sqs = new AWS.SQS({ region: 'eu-west-2' })
const queueURL = 'http://localhost:9324/root/InitialQueue'
exports.handler = async (event, context) => {
  let customerDetails = JSON.parse(event.Records[0].Sns.Message);

  console.log(customerDetails)
  console.log("I swear I am writting up the welcome -email");


  //lambda trigger for email of account creation
  //code for the sqs to store
  const paramC={
    QueueName:'InitialQueue'
  }
  sqs.createQueue(paramC)
  const params = {
    Message: event.Records[0].Message,
    
    QueueURL: queueURL
  }
  sqs.sendMessage(params)




};
