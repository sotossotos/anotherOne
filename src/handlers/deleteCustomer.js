import Responses from '../utils/API_Responses';
import {Customer} from '../../tables/customer';

const tableName = process.env.tableName;

/**
 * 
 * @param { import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {import('../utils/API_Responses')}
 */
exports.handler = async event => {

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the url path' });
    }
    const ID = event.pathParameters.ID;
    let customer;
    try{
      customer =await Customer.get(ID);
    }catch(err){
      console.log('error in dynamo read', err);
      return  Responses._500({ message: 'Internal ERROR' });
    }
    if(!customer)return Responses._400({message:`The customer with iD-> ${ID} doesn't exist`})
    try{
       res=await Customer.destroy(ID);
    }catch(err){
      console.log('error in dynamo deletion', err);
      return  Responses._500({ message: 'Internal ERROR' });
    }
    console.log(res);
    return Responses._200({message: `Successful deletion of customer with ID -> ${ID}`} );
};
