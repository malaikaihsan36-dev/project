const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const chatCtrl = require('../controllers/chatController');
const projCtrl = require('../controllers/projectController');

// Orders
router.post('/orders', orderCtrl.saveOrder);
router.patch('/orders/:id/pricing', orderCtrl.updatePricing); 
router.get('/admin/all-orders', orderCtrl.getAllOrders);
router.patch('/orders/:id/status', orderCtrl.updateStatus);
router.post('/save-design', orderCtrl.saveTempDesign);

// --- FIX HERE: Add 'orderCtrl.' prefix ---
router.post('/order/update-preview', orderCtrl.updateOrderPreview); 

// POST route for resuming design/chat
router.post('/orders/resume-design', orderCtrl.resumeOrderDesign);

// Chat & Timer
router.get('/chat/:orderId', chatCtrl.getChatHistory);
router.get('/order/:orderId', chatCtrl.getOrderDetails);
router.post('/order/extend-expiry', chatCtrl.extendExpiry);

// Projects & Reviews
router.get('/projects', projCtrl.getAllProjects);
router.post('/projects', projCtrl.addProject);
router.get('/reviews/approved', projCtrl.getApprovedReviews);
router.post('/reviews', projCtrl.submitReview);

module.exports = router;