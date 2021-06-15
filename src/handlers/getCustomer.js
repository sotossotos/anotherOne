import Responses from '../utils/API_Responses';
import { Customer } from '../../tables/customer';

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
  try {
    customer = await Customer.get(ID);
  } catch (err) {
    console.log('error in dynamo read', err);
    return Responses._500({ message: 'Internal ERROR' });
  }

  if (!customer) {
    return Responses._404({ message: 'Failed 123 to get customer with specified ID' });
  }

  return Responses._200(customer.attrs);
};
