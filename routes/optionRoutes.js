const express = require('express');
const optionController = require('../controllers/optionController');
const router = express.Router();

router
  .route('/')
  .get(optionController.getOptions)
  .post(optionController.saveOptions);

module.exports = router;