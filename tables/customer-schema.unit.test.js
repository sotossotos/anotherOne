const customerSchema = require('../tables/customer-schema');

test('Customer Schema is an object', ()=>{
    expect(typeof customerSchema).toBe('object');
});

test('Customer Schema sanity check', ()=>{
    data={ID:"12345",name:"someName",surname:"someSurname",birthYear:"2001"};
    const res= customerSchema.validate(data);
    expect(res.error).toStrictEqual(undefined);
});
test('Customer Schema sanity check missing surname', ()=>{
    data={ID:"12345",name:"someName",birthYear:"2001"};
    const res= customerSchema.validate(data);
    expect(res.error).toStrictEqual(undefined);
});

test('Customer Schema age problem', ()=>{
    data={ID:"12345",name:"someName",surname:"someSurname",birthYear:"1899"};
    const res= customerSchema.validate(data);
    expect(res.error.details[0].type).toBe("number.min");
});
test('Customer Schema age problem', ()=>{
    data={ID:"12345",name:"someName",surname:"someSurname",birthYear:"2010"};
    const res= customerSchema.validate(data);
    expect(res.error.details[0].type).toBe("number.max");
});
test('Customer Schema ID LENGTH', ()=>{
    data={ID:"12",name:"someName",surname:"someSurname",birthYear:"2010"};
    const res= customerSchema.validate(data);
    expect(res.error.details[0].type).toBe("string.min");
});

