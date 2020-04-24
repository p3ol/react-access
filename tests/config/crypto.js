const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    ...crypto,
    getRandomValues: arr => crypto.randomBytes(arr.length),
  },
});
