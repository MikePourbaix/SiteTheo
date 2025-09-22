const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('ressources.hbs');
});


module.exports = router;
