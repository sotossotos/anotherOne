const Responses = require('../utils/API_Responses');
const Dynamo = require('../utils/Dynamo');
const customerTable = require('../../tables/customer');
const customerSchema= require('../../tables/customer-schema');

//const tableName = process.env.tableName;
const tableName="customer-table";
exports.handler = async event => {
    console.log(event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the url path' });
    }
    let ID = event.pathParameters.ID;
    const customer = JSON.parse(event.body);
    customer.ID = ID;
    const res=customerSchema.validate(customer);
    if(typeof(res.error)!== 'undefined'){
        const errorMsg=res.error.message.replace(/"/g,'');
        return Responses._400({ message: 'ERROR: '+errorMsg });
    }
    let newCustomer;
    
    try{
      newCustomer=new customerTable(customer);
      await newCustomer.save();
    }catch(err){
      console.log('error in dynamo write', err);
      if(err){
        return  Responses._400({ message: 'Error -> '+err.details[0].message });
      }
      
    }

    if (!newCustomer) {
        return Responses._500({ message: 'Internal ERROR' });
    }

    return Responses._200({ newCustomer });
};
