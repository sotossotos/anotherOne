let dynamov1=require('dynamodb');
const joi =require('joi');
let options = {};

if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}
dynamov1.AWS.config.update(options);
const Customer = dynamov1.define('customer-table', {
  hashKey : 'ID',
 
  schema : {
    ID:joi.string().alphanum().min(5).required(),
    name:joi.string().required(),
    surname:joi.string(),
    birthYear:joi.number().integer().min(1900).max(2009).required()
  },
  tableName:'customer-table'
});

module.exports = Customer,dynamov1;
