const { expect } = require('chai');
const NumbersValidator = require('../app/numbers_validator');

describe('isAllNumbers', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true when provided with array of numbers', () => {
    const validationResults = validator.isAllNumbers([1, 2, 3]);
    expect(validationResults).to.be.equal(true);
  });

  it('should return true when provided with an array containing not only numbers', () => {
    const validationResults = validator.isAllNumbers([1, 'a', 3]);
    expect(validationResults).to.be.equal(false);
  });

  it('should return an error when provided a string', () => {
    expect(() => {
      validator.isAllNumbers('4');
    }).to.throw('[4] is not an array');
  });
});
