/* eslint-disable linebreak-style */
const { expect } = require('chai');
const NumbersValidator = require('../app/numbers_validator');

describe('isNumberEven', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true when provided with an even number', () => {
    const validationResults = validator.isNumberEven(4);
    expect(validationResults).to.be.equal(true);
  });

  it('should return an error when provided a string', () => {
    expect(() => {
      validator.isNumberEven('4');
    }).to.throw('[4] is not of type "Number" it is of type "string"');
  });

  it('should return false when provided with an odd number', () => {
    const validationResults = validator.isNumberEven(3);
    expect(validationResults).to.be.equal(false);
  });
});
