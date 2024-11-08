const express = require('express');
const { evaluateVideo } = require('../controllers/evaluateController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, evaluateVideo);

module.exports = router;