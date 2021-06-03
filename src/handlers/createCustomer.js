const Responses = require('../utils/API_Responses');
const Dynamo = require('../utils/Dynamo');

//const tableName = process.env.tableName;
const tableName='customer-table';
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
    const newCustomer = await Dynamo.write(customer, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null;
    });

    if (!newCustomer) {
        return Responses._400({ message: 'Failed to write customer by ID' });
    }

    return Responses._200({ newCustomer });
};