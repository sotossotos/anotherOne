import Responses from '../utils/API_Responses';
import { Dynamo } from '../utils/Dynamo';
import { customerSchema } from '../../tables/customer-schema';
const tableName = process.env.tableName;
/**
 * 
 * @param { * } event 
 * @returns {import('../utils/API_Responses')}
 */
const handler = async event => {

  const ID = event.pathParameters.ID;
  const customer = JSON.parse(event.body);
  customer.ID = ID;
  //res has value and error fields
  const res = customerSchema.validate(customer);
  if (typeof (res.error) !== 'undefined') {
    const errorMsg = res.error.message.replace(/"/g, '');
    return Responses._400({ message: 'ERROR: ' + errorMsg });
  }
  const newCustomer = await Dynamo.write(customer, tableName).catch(err => {
    console.log('error in dynamo write', err);
    return Responses._500({ message: 'Internal ERROR' });
  });

  if (!newCustomer) {
    return Responses._400({ message: 'Failed to write customer by ID' });
  }

  return Responses._200({ newCustomer });
};
export { handler }
