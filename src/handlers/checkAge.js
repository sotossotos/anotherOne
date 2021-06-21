'use strict'
import Responses from '../utils/API_Responses'
import { APIGatewayProxyEvent } from 'aws-lambda'

/**
 * This API gateway checks age limit for over/under certain age(18)
 *
 *
 * @param { APIGatewayProxyEvent} event
 * @returns { Responses }
 */
const handler = async (event) => {
  const age = String(event.pathParameters.AGE)
  const user = JSON.parse(event.body)
  let check = '-limit'
  if (!user.name || !user.surname) {
    return Responses._400({ message: 'Something wrong with JSON BODY' })
  }
  if (isNaN(parseInt(age))) {
    return Responses._400({ message: 'Age parameter expected in url' })
  }

  if (parseInt(age) < 18) {
    check = 'under' + check
  } else {
    check = 'over' + check
  }
  return Responses._200({ message: 'Based on the age provided ' + user.name + ' ' + user.surname + ' you are ' + check })
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'Based on the age provided ' + user.name + ' ' + user.surname + ' you are ' + check,
  //       input: event
  //     },
  //     null,
  //     2
  //   )
  // }
}
export { handler }
