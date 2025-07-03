const express = require('express');
const router = express.Router();
const subManager = require('../managers/subscribe-manager');

router.get('/', (req, res) => {
  const subscribers = subManager.getSubscribers();
  res.render('home', { subscribers});
});

module.exports = router;
