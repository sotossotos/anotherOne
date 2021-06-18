//const Dynamo = require('../utils/Dynamo'); 
import { Dynamo } from '../utils/Dynamo'

test('Dynamo is an object', () => {
  expect(typeof Dynamo).toBe('object');
});

test('Dynamo has func get & write', () => {
  expect(typeof Dynamo.get).toBe('function');
  expect(typeof Dynamo.write).toBe('function');
});

const validTableName = 'customer-table';
const data = { ID: '23223', name: 'thisName', surname: 'thisSurname' };

test('Dynamo write works', async () => {
  expect.assertions(1)
  try {
    const result = await Dynamo.write(data, validTableName);
    expect(result).toBe(data);
  } catch (error) {
    console.log('error in dynamo write test', error);
  }
});
test('dynamo get works', async () => {
  expect.assertions(1);
  try {
    const result = await Dynamo.get(data.ID, validTableName);
    expect(result).toEqual(data);
  } catch (error) {
    console.log('error in dynamo get', error);
  }
});
Dynamo.write = jest.fn();
Dynamo.write.mockImplementation((data, validTableName) => {
  if (!data.ID || !validTableName) {
    return undefined;
  }
  return data;
});
Dynamo.get = jest.fn();
Dynamo.get.mockImplementation((id, tableName) => {
  if (data.ID === id && validTableName === tableName) {
    return data;
  }
  return undefined;
});


test('Dynamo write with mockup assuming the dynamodb works', async () => {
  expect.assertions(1)
  try {
    const result = await Dynamo.write(data, validTableName);
    expect(result).toBe(data);

  } catch (error) {
    console.log('error in dynamo write test', error);
  }
});
test('Dynamo get with mockup assuming the dynamodb works', async () => {
  expect.assertions(1)
  try {
    const result = await Dynamo.get(data.id, validTableName);
    expect(result).toBe(data);

  } catch (error) {
    console.log('error in dynamo read test', error);
  }
});



test('should fail', () => {
  //expect(false).toBe(true);
});
