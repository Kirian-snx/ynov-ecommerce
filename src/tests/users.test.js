const { describe, it } = require('node:test');
const assert = require('node:assert');

const users = require('../data/users');

describe('Users data', () => {
  it('should have at least one user', () => {
    assert.ok(users.length > 0);
  });

  it('each user should have id, name and email', () => {
    for (const u of users) {
      assert.ok(u.id, 'missing id');
      assert.ok(u.name, 'missing name');
      assert.ok(u.email, 'missing email');
    }
  });

  it('user emails should contain @', () => {
    for (const u of users) {
      assert.ok(u.email.includes('@'), `invalid email: ${u.email}`);
    }
  });
});
