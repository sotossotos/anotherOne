const createCustomer=require('../../src/handlers/createCustomer');
const eventGen=require('../testUtils/eventGen');
const validators=require('../testUtils/validators');

describe('Create customer integration test',()=>{
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = { ...OLD_ENV }; // Make a copy
    });
  
    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });



    test('it should take a body and return an API Gateway response', async()=>{
        const event=eventGen({
            body:{
                name:'solo',
                surnname:'man'
            },
        });
        const result=await createCustomer.handler(event);
        expect(result).toBeDefined();
        expect(validators.isApiGatewayResponse(result)).toBe(true);
    });
    test('It should return a 200 with a customer if data is valid', async()=>{
        process.env.tableName='customer-table';
        const event=eventGen({
            body:{
                name:'solo',
                surname:'man'
            },
            pathParametersObject:{
                ID:'fasd234',
            },
        });
        const result=await createCustomer.handler(event);
        expect(result.statusCode).toBe(200);
        const body=JSON.parse(result.body);
        expect(body).toEqual({
            newCustomer:{
                name:'solo',
                surname:'man',
                ID:'fasd234',
            }
        })
    });

});