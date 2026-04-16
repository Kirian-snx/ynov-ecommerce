const { describe, it } = require('node:test');
const assert = require('node:assert');

const orders = require('../data/orders');

describe('Orders data', () => {
  it('should have at least one order', () => {
    assert.ok(orders.length > 0);
  });

  it('each order should have id, userId, productIds and status', () => {
    for (const o of orders) {
      assert.ok(o.id, 'missing id');
      assert.ok(o.userId, 'missing userId');
      assert.ok(Array.isArray(o.productIds), 'productIds should be an array');
      assert.ok(o.status, 'missing status');
    }
  });

  it('order status should be a valid value', () => {
    const valid = ['pending', 'shipped', 'delivered', 'cancelled'];
    for (const o of orders) {
      assert.ok(valid.includes(o.status), `invalid status: ${o.status}`);
    }
  });
});
