import { randomString, generateId } from './utils';

describe('utils.ts', () => {
  describe('randomString()', () => {
    it('should generate a 5 chars length random string', () => {
      expect(randomString()).toHaveLength(5);
    });
  });

  describe('generateId()', () => {
    it('should generate an id if it doesn\'t already exist in the doc', () => {
      expect(generateId()).toMatch(/poool-.{5}-.{5}/);
    });
  });
});
