const Responses = require('../utils/API_Responses');
const Dynamo = require('../utils/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
 
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the url path' });
    }

    let ID = event.pathParameters.ID;

    const customer = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!customer) {
        return Responses._404({ message: 'Failed to get customer with specified ID' });
    }

    return Responses._200({ customer });
};