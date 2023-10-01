const { expect } = require('chai');
const NumbersValidator = require('../app/numbers_validator');

describe('getEvenNumbersFromArray', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return an array of even numbers when provided with an array of numbers', () => {
    const validationResults = validator.getEvenNumbersFromArray([1, 2, 3, 4]);
    expect(validationResults).to.deep.equal([2, 4]);
  });

  it('should return an error when provided with an array not containing only numbers', () => {
    expect(() => {
      validator.getEvenNumbersFromArray('4');
    }).to.throw('[4] is not an array of "Numbers"');
  });

  it('should return an error when provided a string', () => {
    expect(() => {
      validator.getEvenNumbersFromArray('4');
    }).to.throw('[4] is not an array of "Numbers"');
  });
});
