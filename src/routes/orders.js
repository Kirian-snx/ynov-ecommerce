const express = require('express');
const router = express.Router();
const orders = require('../data/orders');
const products = require('../data/products');

const FEATURE_V2_ORDERS = process.env.FEATURE_V2_ORDERS === 'true';

function enrichOrder(order) {
  const total = order.productIds.reduce((sum, pid) => {
    const product = products.find(p => p.id === pid);
    return sum + (product ? product.price : 0);
  }, 0);
  return { ...order, total: parseFloat(total.toFixed(2)) };
}

// GET /api/orders
router.get('/', (req, res) => {
  const data = FEATURE_V2_ORDERS ? orders.map(enrichOrder) : orders;
  res.json(data);
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// POST /api/orders
router.post('/', (req, res) => {
  const { userId, productIds } = req.body;
  if (!userId || !productIds || !Array.isArray(productIds)) {
    return res.status(400).json({ error: 'userId and productIds[] are required' });
  }
  const newOrder = {
    id: orders.length + 1,
    userId,
    productIds,
    total: 0,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// PATCH /api/orders/:id/status
router.patch('/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  const { status } = req.body;
  const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
  }
  order.status = status;
  res.json(order);
});

module.exports = router;
