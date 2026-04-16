const { describe, it } = require('node:test');
const assert = require('node:assert');

const products = require('../data/products');

describe('Products data', () => {
  it('should have at least one product', () => {
    assert.ok(products.length > 0);
  });

  it('each product should have id, name and price', () => {
    for (const p of products) {
      assert.ok(p.id, 'missing id');
      assert.ok(p.name, 'missing name');
      assert.ok(p.price !== undefined, 'missing price');
    }
  });

  it('product prices should be positive', () => {
    for (const p of products) {
      assert.ok(p.price > 0, `price of "${p.name}" is not positive`);
    }
  });
});
