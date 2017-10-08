const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');


describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'test user';
    const text = 'message from test user';
    let result = generateMessage(from, text);
    expect(result.createdAt).toBeA('number');
    expect(result).toInclude({from,text});
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'test user';
    const lat = 20.121;
    const long = 21.212;
    const url = 'https://www.google.com/maps?q=20.121,21.212';
    let result = generateLocationMessage(from, lat,long);
    expect(result.createdAt).toBeA('number');
    expect(result).toInclude({from,url});
  });
});
