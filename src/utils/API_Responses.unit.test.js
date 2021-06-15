const Responses = require('../utils/API_Responses');

test('Responses is an object', () => {
  expect(typeof Responses).toBe('object');
});

test('200 sanity test', () => {
  const res = Responses._200({ name: 'josh' });
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('string');
  expect(res.headers['Content-Type']).toBe('application/json');
});
test('400 sanity test', () => {
  const res = Responses._400({ name: 'josh' });
  expect(res.statusCode).toBe(400);
  expect(typeof res.body).toBe('string');
  expect(res.headers['Content-Type']).toBe('application/json');
});
test('404 sanity test', () => {
  const res = Responses._404({ name: 'josh' });
  expect(res.statusCode).toBe(404);
  expect(typeof res.body).toBe('string');
  expect(res.headers['Content-Type']).toBe('application/json');
});
test('500 sanity test', () => {
  const res = Responses._500({ name: 'josh' });
  expect(res.statusCode).toBe(500);
  expect(typeof res.body).toBe('string');
  expect(res.headers['Content-Type']).toBe('application/json');
});

test('Define Response', () => {
  const res = Responses._DefineResponse(111, { anyattr: 'whatever' });
  expect(res.statusCode).toBe(111);
  expect(res.body).toBe(JSON.stringify({ anyattr: 'whatever' }));
});
