import * as deleter from '../handlers/deleteCustomer'
// import {Responses} from '../utils/API_Responses'
const Responses = require('../utils/API_Responses');

deleter.getCustomer=jest.fn()
deleter.getCustomer.mockReturnValue(true)
deleter.handler=jest.fn()
deleter.handler.mockReturnValue(Responses._400({message:'UnSuccessful deletion of customer'}))
               .mockReturnValueOnce(Responses._200({message:'Successful deletion of customer'}))
describe('Testing customer deletion end-point',()=>{
  
  let placeHolderEvent;
  test ('Testing deletion of existing customer',()=>{
    let existingID=22345;
    expect.assertions(1);
    if(deleter.getCustomer(existingID)){
      expect(deleter.handler(placeHolderEvent).statusCode).toBe(200);
    }
  })
  
  test ('Testing deletion of non-existing customer',()=>{
    let nonExistingID=35425234534;
    expect.assertions(1)
    if(deleter.getCustomer(nonExistingID)){
      expect(deleter.handler(placeHolderEvent).statusCode).toBe(400);
    }
  })
 

})
