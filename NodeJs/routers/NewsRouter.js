const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController');

// Routes
router.post('/', newsController.createNews);
router.get('/', newsController.getAllNews);
router.delete('/:id', newsController.deleteNewsById); // Added route for deleting news by ID
router.put('/:id', newsController.updateNewsById);

module.exports = router;
