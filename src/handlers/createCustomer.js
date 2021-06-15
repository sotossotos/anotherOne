import Responses from '../utils/API_Responses';
import { Customer } from '../../tables/customer';
import { customerSchema } from '../../tables/customer-schema';
const tableName = process.env.tableName;

/**
 * This API gateway creates new customer item 
 * 
 * 
 * @param { import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {import('../utils/API_Responses')} 
 */
exports.handler = async event => {
  let newCustomer = inputCheck(event);
  if (newCustomer.statusCode) {
    return newCustomer;
  }
  try {
    newCustomer = await new Customer(newCustomer);
    await newCustomer.save();
  } catch (err) {
    console.log('error in dynamo write', err);
    if (err) {
      return Responses._400({ message: 'Error -> ' + err.details[0].message });
    }
  }
  if (!newCustomer) {
    return Responses._500({ message: 'Internal ERROR' });
  }
  return Responses._200({ newCustomer });
};

//export function inputCheck(event){
/**
 * 
 * @param {*} event 
 * @returns {Responses||JSON}
 */
export const inputCheck = event => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({ message: 'missing the ID from the url path' });
  }
  const ID = event.pathParameters.ID;
  const customer = JSON.parse(event.body);
  customer.ID = ID;
  const res = customerSchema.validate(customer);
  if (typeof (res.error) !== 'undefined') {
    const errorMsg = res.error.message.replace(/"/g, '');
    return Responses._400({ message: 'ERROR: ' + errorMsg });
  }
  return customer;
}


