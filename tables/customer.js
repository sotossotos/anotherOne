// let dynamov1=require('dynamodb');
// const joi =require('joi');

import  dynamov1 from 'dynamodb' ;
import joi from  'joi';
let options = {};

if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}
if (process.env.JEST_WORKER_ID){
  options={
      endpoint: 'http://localhost:8000',
      region: 'local-env',
      sslEnabled: false,
  };
}
dynamov1.AWS.config.update(options);
export const Customer = dynamov1.define('customer-table', {
  hashKey : 'ID',
 
  schema : {
    ID:joi.string().alphanum().min(5).required(),
    name:joi.string().required(),
    surname:joi.string(),
    birthYear:joi.number().integer().min(1900).max(2009).required()
  },
  tableName:'customer-table'
});

