const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const chatCtrl = require('../controllers/chatController');
const projCtrl = require('../controllers/projectController');
const customerController = require('../controllers/customerController');
const productController = require('../controllers/productController');

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

// Status Persistence (This is the one for Approvals/Placed)
router.post('/order/update-status', orderCtrl.updateOrderStatus);

// Chat & Timer
router.get('/chat/:orderId', chatCtrl.getChatHistory);
router.get('/order/:orderId', chatCtrl.getOrderDetails);
router.post('/order/extend-expiry', chatCtrl.extendExpiry);

// finalized order route
router.post('/orders/finalize/:temp_order_id', orderCtrl.finalizeOrder);

// Cleanup expired order (Delete Chat + Order)
router.delete('/admin/cleanup-expired-order/:id', orderCtrl.cleanupExpiredOrder);

// GET all customers with order summary
router.get('/admin/customers', customerController.getAllCustomers);

// Categories Routes
router.get('/categories', productController.getAllCategories);
router.post('/categories', productController.addCategory);
router.delete('/categories/:id', productController.deleteCategory);

// Products Routes
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/:id', productController.getProductById);

// Portfolio Projects 
router.get('/projects', projCtrl.getAllProjects);
router.post('/projects', projCtrl.addProject);
router.put('/projects/:id', projCtrl.updateProject);
router.delete('/projects/:id', projCtrl.deleteProject);

// Review Admin Routes
router.get('/reviews', projCtrl.getAllReviews); // Line 42 (Yahan masla tha)
router.patch('/reviews/:id/status', projCtrl.updateReviewStatus);

// Product List Admin Routes
router.get('/product-list', projCtrl.getProductList);
router.post('/product-list', projCtrl.addProductToList);
router.delete('/product-list/:id', projCtrl.deleteProductFromList);

// User Side Reviews
router.get('/reviews/approved', projCtrl.getApprovedReviews);
router.post('/reviews', projCtrl.submitReview);

// Portfolio Categories
router.get('/portfolio-categories', projCtrl.getPortfolioCategories);
router.post('/portfolio-categories', projCtrl.addPortfolioCategory);
router.delete('/portfolio-categories/:id', projCtrl.deletePortfolioCategory);

// Contact Subjects
router.get('/contact-subjects', projCtrl.getContactSubjects);
router.post('/contact-subjects', projCtrl.addContactSubject);
router.delete('/contact-subjects/:id', projCtrl.deleteContactSubject);

module.exports = router;