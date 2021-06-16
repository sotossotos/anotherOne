
import AWS from 'aws-sdk'
const ses= new AWS.SES({region:'localhost',endpoint:'http://localhost:9001'})
exports.handler = async (event) => {
  console.log("SQS Message has been stored and processed !")
  const customerDetails= JSON.parse(event.Records[0].body); 
  console.log(event.Records[0].body);
  const destEmail=customerDetails.email.S;
  
  console.log(destEmail);

}
