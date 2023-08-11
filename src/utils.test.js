import { randomString, generateId } from './utils';

describe('utils.js', () => {
  describe('randomString()', () => {
    it('should generate a 5 chars length random string', () => {
      expect(randomString().length).toBe(5);
    });
  });

  describe('generateId()', () => {
    it('should generate an id if it doesn\'t already exist in the doc', () => {
      expect(/poool-.{5}-.{5}/.test(generateId())).toBe(true);
    });
  });
});
