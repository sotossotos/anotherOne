import * as checker from '../handlers/createFile'

describe('Testing create simple json file lambda-API endpoint', () => {

  function eventProducer(fileName, data) {
    let event = {
      pathParameters: {
        fName: `${fileName}`
      },
      body: JSON.stringify(data)
    }
    return event;
  }
  let data = { name: 'aName', birthCity: 'Glasgow', countryOrigi: 'Scotland', languages: ['English', 'Spanish'], birthYear: 2000 };
  let fileNameInput;
  test('This test a valid file', () => {
    expect.assertions(1);
    fileNameInput = "fileName.json"

    let res = checker.inputCheck(eventProducer(fileNameInput, data));
    expect(res).toMatchObject(data);
  })
  test('This test file no extention', () => {
    expect.assertions(1);
    fileNameInput = "fileName"
    let res = checker.inputCheck(eventProducer(fileNameInput, data));
    expect(res.statusCode).toBe(400);
  })
  test('This test file extension anything but json', () => {
    expect.assertions(1);
    fileNameInput = "fileName.randomExt"
    let res = checker.inputCheck(eventProducer(fileNameInput, data));
    expect(res.statusCode).toBe(400);
  })
  test('This test with no file provided', () => {
    expect.assertions(1);
    fileNameInput = ""
    let res = checker.inputCheck(eventProducer(fileNameInput, data));
    expect(res.statusCode).toBe(400);
  })


});
