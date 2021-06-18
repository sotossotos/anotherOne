
// First try of creating lambda
import * as pg from 'pg';
import { Sequelize } from 'sequelize'
import Responses from '../utils/API_Responses.js';
/**
 * 
 * @param {import('serverless/plugins/aws/package/compile/events/apiGateway/lib/validate').ApiGatewayEvent} event 
 * @returns {JSON}
 */
const sequelize = new Sequelize('customers', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  dialectModule: pg,
})
exports.handler = async (event) => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established Postgres DB successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  return Responses._200({ statusCode: 'success', message: 'AnotherOne is Running !', input: event });


}

