'use strict'
const Responses = require('../anotherOne/API_Responses');
const AWS = require("aws-sdk");
exports.handler = async (event) => {
    var age = String(event.pathParameters.AGE);
    const user = JSON.parse(event.body);
    if (!user.name || !user.surname){
        return Responses._400({ message: 'Something wrong with JSON BODY' });
    }
    if(isNaN(age)){
        return Responses._400({ message: 'Age parameter expected in url' });
    }
    console.log(age)
    var check="-limit"
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