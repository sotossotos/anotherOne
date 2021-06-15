
import AWS from 'aws-sdk'
const sqs = new AWS.SQS({ endpoint:'0.0.0.0:9324' })
const queueURL = 'http://0.0.0.0:9324/queue/InitialQueue'
exports.handler = async (event, context) => {
  let customerDetails = JSON.parse(event.Records[0].Sns.Message);

  console.log(customerDetails)
  console.log("I swear I am writting up the welcome -email");


  //lambda trigger for email of account creation
  //code for the sqs to store
  // const paramC={
  //   QueueName:'InitialQueue'
  // }
  // sqs.createQueue(paramC)
  const params = {
    MessageBody: 'This is a message body',
    QueueUrl: queueURL
  }
  sqs.sendMessage(params, function(err,data){
    if (err){
      console.log('error:','Fail Send Message'+err)
    }else{
      console.log("It worked"+ data)
    }
  })




};
