const express = require('express');
const playerController = require('../controllers/playerController');
const router = express.Router();

router
  .route('/')
  .get(playerController.getPlayerMove)
  .post(playerController.savePlayerMove);

module.exports = router;