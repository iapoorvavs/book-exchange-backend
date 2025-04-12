const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { uploadBook, getAvailableBooks, requestExchange } = require('../controllers/bookController');

router.post('/upload', authMiddleware, uploadBook);
router.get('/', authMiddleware, getAvailableBooks);
router.post('/request/:id', authMiddleware, requestExchange);

module.exports = router;
