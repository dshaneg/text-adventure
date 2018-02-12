import { expect } from 'chai';
import 'mocha';

function hello(): string {
  return 'Hello world!';
}

describe('Hello function', () => {

  it('should return hello world', () => {
    const result = hello();
    expect(result).to.equal('Hello world!');
  });
});