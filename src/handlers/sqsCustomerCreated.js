
import AWS from 'aws-sdk'
const ses = new AWS.SES({ region: 'eu-west-2', endpoint: 'http://localhost:9001' })
exports.handler = async (event) => {
  console.log("SQS Message has been stored and processed !")
  const customerDetails = JSON.parse(event.Records[0].body);
  console.log(event.Records[0].body);
  //{"birthYear":{"N":"2000"},"surname":{"S":"antonios"},"name":{"S":"andreas"},"ID":{"S":"22222"},"email":{"S":"some@yahoo.com"}}
  console.log(customerDetails.email.S);
  console.log(customerDetails.name.S);
  console.log(customerDetails.surname.S);
  console.log(customerDetails.ID.S);
  var params = {
    Destination: {
      ToAddresses: [
        `'${customerDetails.email.S}'`],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `'Welcome to our electricity service  ${customerDetails.name.S} ${customerDetails.surname.S}, your account has been created !'`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `'Welcome user ${customerDetails.ID.S}'`,
      },
    },
    Source: 'YourProvider@electricity.co.uk',
  };
  // try{
  //   await ses.sendEmail(params).promise();
  // }catch(error){
  //   console.log('error sending the email',error)
  // }

}
