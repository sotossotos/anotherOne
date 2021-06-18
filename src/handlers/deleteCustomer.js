import Responses from '../utils/API_Responses';
import { Customer } from '../../tables/customer';
import { APIGatewayProxyEvent } from 'aws-lambda';

const tableName = process.env.tableName;

/**
 * 
 * @param { APIGatewayProxyEvent } event 
 * @returns {}
 */
exports.handler = async event => {
  let res;
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({ message: 'missing the ID from the url path' });
  }
  const ID = event.pathParameters.ID;
  let customer = await getCustomer(ID);

  if (!customer) return Responses._400({ message: `The customer with iD-> ${ID} doesn't exist` })
  if (customer.statusCode) return customer;
  try {
    res = await Customer.destroy(ID);
  } catch (err) {
    console.log('error in dynamo deletion', err);
    return Responses._500({ message: 'Internal ERROR' });
  }
  return Responses._200({ message: `Successful deletion of customer with ID -> ${ID}` });
};

export const getCustomer = async id => {
  let customerRes;
  try {
    customerRes = await Customer.get(id);
  } catch (err) {
    console.log('error in dynamo read', err);
    return Responses._500({ message: 'Internal ERROR' });
  }
  return customerRes;
}
