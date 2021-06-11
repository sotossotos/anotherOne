import * as checker from '../handlers/createCustomer'
import {Responses} from '../utils/API_Responses'
import {customerSchema} from '../../tables/customer-schema'

describe('Testing create customer Lambda',()=>{
  // Handler invocation 
  function  eventProducer(ID,name=undefined,surname=undefined,birthYear=undefined){
    let event={
      pathParameters:{
        ID: `${ID}`},
      body: ``
    }
      event.body+="{";
      if(name){ event.body+=`"name":"${name}"`;}
      if(name && surname){event.body+=`,`;}
      if(surname){event.body+=`"surname":"${surname}"`;}
      if((surname || name) && birthYear){event.body+=`,`}
      if(birthYear){event.body+=`"birthYear":${birthYear} `}
      event.body+="}"
    return event;
  }
  let data;
  test('Test with simple correct valid data',()=>{
    expect.assertions(1);
    data={ID: '11111', name:'aName',surname:'aSurname',birthYear:2000};
    //console.log(eventProducer(data.ID,data.name,data.surname));
    let res=checker.inputCheck(eventProducer(data.ID,data.name,data.surname,data.birthYear));
    expect(res).toMatchObject(data);

  });
  test('Test with year of birth to low cause a 400',()=>{
    expect.assertions(1);
    data={ID: '11111', name:'aName',surname:'aSurname',birthYear:1899};
    let res=checker.inputCheck(eventProducer(data.ID,data.name,data.surname,data.birthYear));
    //console.log(res)
    expect(res.statusCode).toBe(400);

  });
  test('Test with a Smaller size ID below 5',()=>{
    expect.assertions(1);
    data={ID: '111', name:'aName',surname:'aSurname',birthYear:1899};
    let res=checker.inputCheck(eventProducer(data.ID,data.name,data.surname,data.birthYear));
    expect(res.statusCode).toBe(400);

  });
  test('Test without birth year',()=>{
    expect.assertions(1);
    data={ID: '11111', name:'aName',surname:'aSurname'};
    let res=checker.inputCheck(eventProducer(data.ID,data.name,data.surname));
    expect(res.statusCode).toBe(400);

  });
  test('Test without surname',()=>{
    expect.assertions(1);
    data={ID: '111111', name:'aName',birthYear:1900};
    let res=checker.inputCheck(eventProducer(data.ID,data.name,undefined,data.birthYear));
    expect(res).toMatchObject(data);

  });
  test('Test without name',()=>{
    expect.assertions(1);
    data={ID: '111111', surname:'aSurname',birthYear:1900};
    let res=checker.inputCheck(eventProducer(data.ID,undefined,data.surname,data.birthYear));
    expect(res.statusCode).toBe(400);

  });
  
});
