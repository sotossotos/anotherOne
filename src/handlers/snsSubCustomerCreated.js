
import AWS from 'aws-sdk'
const sqs = new AWS.SQS({ endpoint: `${process.env.host}:${process.env.sqsPort}` })
const queueURL = `http://${process.env.host}:${process.env.sqsPort}/queue/EmailQueue`
exports.handler = async (event, context) => {
  const customerDetails = JSON.parse(event.Records[0].Sns.Message)

  console.log(customerDetails)

  const params = {
    MessageBody: event.Records[0].Sns.Message,
    QueueUrl: queueURL
  }
  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log('error:', 'Fail Send Message' + err)
    } else {
      console.log('Posted to SQS')
    }
  })
}
