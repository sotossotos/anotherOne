const Responses = require('../utils/API_Responses');
//const Dynamo = require('../utils/Dynamo');
const customerTable=require('../../tables/customer');

const tableName = process.env.tableName;
 /*
    
  */
exports.handler = async event => {

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the url path' });
    }

    const ID = event.pathParameters.ID;
    console.log(ID)

    var customer= customerTable.get(ID,(err,acc)=>{
      if(err){
        console.log('error in Dynamo Get', err);
        return Responses._500({ message: 'Internal ERROR' });
      }else{
        customer=acc;
      }
    });

    if (!customer) {
        return Responses._404({ message: 'Failed to get customer with specified ID' });
    }

    return Responses._200({ customer });
};
