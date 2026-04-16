const express = require('express');
const router = express.Router();

const FLAGS = {
  FEATURE_V2_PRODUCTS: {
    description: 'Products response includes `available` and `priceFormatted` fields',
    enabled: process.env.FEATURE_V2_PRODUCTS === 'true',
  },
  FEATURE_V2_ORDERS: {
    description: 'Orders response includes computed `total` based on product prices',
    enabled: process.env.FEATURE_V2_ORDERS === 'true',
  },
};

// GET /api/features
router.get('/', (req, res) => {
  res.json(FLAGS);
});

module.exports = router;
