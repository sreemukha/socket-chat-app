const expect = require('expect');
const {isRealString} = require('./validation');


describe('isRealString', () => {
  it('should reject non-string values', () => {
    const result = isRealString(98);
    expect(result).toBe(false);
  });
  it('should reject string with only spaces', () => {
    const result = isRealString('         ');
    expect(result).toBe(false);
  });
  it('should allow non-space characters', () => {
    const result = isRealString('   test  ');
    expect(result).toBe(true);
  });
});
