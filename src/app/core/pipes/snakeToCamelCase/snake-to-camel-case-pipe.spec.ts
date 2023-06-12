import {SnakeToCamelCasePipe} from './snake-to-camel-case-pipe';

describe('SnakeToCamelCasePipe', () => {
  it('create an instance', () => {
    const pipe = new SnakeToCamelCasePipe();
    expect(pipe).toBeTruthy();
  });
});
