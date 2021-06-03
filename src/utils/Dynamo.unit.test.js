const Dynamo = require('../utils/Dynamo'); 

test('Dynamo is an object', ()=>{
    expect(typeof Dynamo).toBe('object');
});

test('Dynamo has func get & write', ()=>{
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.write).toBe('function');
});

const validTableName = 'customer-table';
const data={ID:'232',name:'thisName',surname:'thisSurname'};

test('Dynamo write works',async()=>{
    expect.assertions(1)
    try{
        const result=await Dynamo.write(data,validTableName);
        expect(result).toBe(data);
    }catch(error){
        console.log('error in dynamo write test', error);
    }
}); 

test('dynamo get works', async()=>{
    expect.assertions(1);
    try{
        const result= await Dynamo.get(data.ID,validTableName);
        expect(result).toEqual(data);
    }catch(error){
        console.log('error in dynamo get',error);
    }
});

test('should fail',()=>{
    //expect(false).toBe(true);
});