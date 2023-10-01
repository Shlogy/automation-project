const { expect } = require('chai');
const NumbersValidator = require('../app/numbers_validator');

describe('isInteger', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('should return true when provided with a number', () => {
    const validationResults = validator.isInteger(4);
    expect(validationResults).to.be.equal(true);
  });

  it('should return an error when provided a string', () => {
    expect(() => {
      validator.isInteger('4');
    }).to.throw('[4] is not a number');
  });
});
