'use strict'
const AWS = require("aws-sdk");
exports.handler = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'AnotherOne is Running !',
          input: event,
        },
        null,
        2
      ),
    }
  }
