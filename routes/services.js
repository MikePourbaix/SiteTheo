const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('services.hbs');
});


module.exports = router;
