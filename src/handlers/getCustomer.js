const Responses = require('../utils/API_Responses');
//const Dynamo = require('../utils/Dynamo');
const customerTable=require('../../tables/customer');

const tableName = process.env.tableName;
 /*
    
  */

var printTheAccount
exports.handler = async event => {

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the url path' });
    }
    const ID = event.pathParameters.ID;
    let customer;
    try{
      customer =await customerTable.get(ID);
    }catch(err){
      console.log('error in dynamo write', err);
      return  Responses._500({ message: 'Internal ERROR' });
    }
  
    if (!customer) {
        return Responses._404({ message: 'Failed to get customer with specified ID' });
    }

    return Responses._200(customer.attrs );
};
