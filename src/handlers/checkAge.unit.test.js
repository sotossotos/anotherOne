import {handler} from '../handlers/checkAge'


describe('Whole suit',()=>{
  async function  asyncEventHelper(age,name,surname){
    const event={
      pathParameters:{
        AGE: `${age}`},
      body: `{ "name":"${name}","surname":"${surname}" }`}
    let res= await handler(event);
    return res;
  }
  describe('check age with wrong JSON BODY',()=>{
    let lambdaRes1;
    beforeAll(async ()=>{lambdaRes1= await asyncEventHelper("AGE","","")});
    test('Sanity object check',()=>{
      expect(typeof handler).toBe('function');
    });
    test('JSON Body empty', ()=>{
      expect(lambdaRes1.statusCode).toBe(400);
    });
  });
  describe('check age edge cases below and over limit',()=>{
    let lambdaRes2;
    let age=17
    beforeEach(async ()=>{lambdaRes2= await asyncEventHelper(age,"aName","aSurname")});
    test('Below limit case',()=>{
      expect(lambdaRes2.statusCode).toBe(200);
      expect(JSON.parse(lambdaRes2.body).message).toBe("Based on the age provided aName aSurname you are under-limit");
      
      //Setup for next test
      age=18
    });
    test('above limit case',()=>{
      expect(lambdaRes2.statusCode).toBe(200);
      expect(JSON.parse(lambdaRes2.body).message).toBe("Based on the age provided aName aSurname you are over-limit");
    
      //Setup for next test
      age="asfdfs";
    });
    test('Random text for case',()=>{
      expect(lambdaRes2.statusCode).toBe(400);
      expect(JSON.parse(lambdaRes2.body).message).toBe("Age parameter expected in url");
    

    })
  });
  
});


