const Responses = require('../utils/API_Responses');
//const Dynamo = require('../utils/Dynamo');
const dynamov1=require('../../tables/customer');

//const tableName = process.env.tableName;
const tableName="customer-table";
exports.handler = async event => {
    
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the url path' });
    }

    let ID = event.pathParameters.ID;
    const customer = JSON.parse(event.body);
    if (! customer.name || !customer.surname ){
        return Responses._400({ message: 'JSON attr missing:name,surname' });
    }
    customer.ID = ID;
    // Changed tableName -> process.env.tableName
    // const newCustomer = await Dynamo.write(customer, tableName).catch(err => {
    //     console.log('error in dynamo write', err);
    //     return  Responses._500({ message: 'Internal ERROR' });
    // });
    let newCustomer;
    await dynamov1.create(customer,(err)=>{
      if(err){
        console.log('error in Dynamo Get', err);
        return Responses._500({ message: 'Internal ERROR' });
      }else{
        newCustomer=customer;
      }
    });
    console.log(newCustomer)
    if (!newCustomer) {
        return Responses._400({ message: 'Failed to write customer by ID' });
    }

    return Responses._200({ newCustomer });
};
