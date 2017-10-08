const expect = require('expect');
const {generateMessage} = require('./message');


describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'test user';
    const text = 'message from test user';
    let result = generateMessage(from, text);
    expect(result.createdAt).toBeA('number');
    expect(result).toInclude({from,text});
  });

});
