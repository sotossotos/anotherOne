'use strict'
// const Responses = require('../utils/API_Responses');
// const AWS = require("aws-sdk");
import Responses from '../utils/API_Responses';
import types from 'aws-lambda';
import AWS from 'aws-sdk';
/**
 * This API gateway checks age limit for over/under certain age(18)
 * 
 * 
 * @param { types.APIGatewayProxyEvent} event 
 * @returns {JSON}
 */
exports.handler = async (event) => {
    let age = String(event.pathParameters.AGE);
    console.log(event);
    const user = JSON.parse(event.body);
    if (!user.name || !user.surname){
        return Responses._400({ message: 'Something wrong with JSON BODY' });
    }
    if(isNaN(age)){
        return Responses._400({ message: 'Age parameter expected in url' });
    }
    console.log(age)
    let check="-limit"
    if (age<18){
        check="under"+check
    }else{
        check="over"+check
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Based on the age provided '+user.name +' '+user.surname+' you are '+check,
          input: event,
        },
        null,
        2
      ),
    }
  }
