'use strict'
const Responses = require('../utils/API_Responses');
const AWS = require("aws-sdk");
exports.handler = async (event) => {
    var name = String(event.pathParameters.NAME);
    console.log(name)
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Hello User: '+name,
          input: event,
        },
        null,
        2
      ),
    }
  }