const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const projCtrl = require('../controllers/projectController');

// Orders user
router.post('/orders', orderCtrl.saveOrder);
router.patch('/orders/:id/pricing', orderCtrl.updatePricing);
router.post('/save-design', orderCtrl.saveTempDesign);

// Orders admin
router.get('/admin/all-orders', orderCtrl.getAllOrders); // Ye wahi hai jo humne pehle discuss kiya tha
router.patch('/orders/:id/status', orderCtrl.updateStatus);

// Projects
router.get('/projects', projCtrl.getAllProjects);
router.post('/projects', projCtrl.addProject);

// Reviews
router.get('/reviews/approved', projCtrl.getApprovedReviews);
router.post('/reviews', projCtrl.submitReview);

module.exports = router;