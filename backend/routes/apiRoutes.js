const express = require('express');
const router = express.Router();

// Controllers
const orderCtrl = require('../controllers/orderController');
const chatCtrl = require('../controllers/chatController');
const projCtrl = require('../controllers/projectController');
const customerController = require('../controllers/customerController');
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');
const whatsappCtrl = require('../controllers/whatsappController');

// --- WHATSAPP TESTING ROUTE ---
// Is se aap check kar saken ge ke backend se message ja raha hai ya nahi
router.post('/test-whatsapp', async (req, res) => {
    try {
        await whatsappCtrl.sendOrderAlert("TEST-123", "500");
        res.status(200).json({ success: true, message: "WhatsApp Alert Sent!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ADMIN MANAGEMENT ROUTES ---
// Inhe upar rakhein aur paths ko specific karein
router.get('/admin-list', adminController.getAllAdmins);
router.post('/admin/add', adminController.addAdmin);
router.delete('/admin/:id', adminController.deleteAdmin);
router.post('/admin/login', adminController.loginAdmin);

// --- ORDERS ---
router.post('/orders', orderCtrl.saveOrder);
router.patch('/orders/:id/pricing', orderCtrl.updatePricing); 
router.get('/admin/all-orders', orderCtrl.getAllOrders);
router.patch('/orders/:id/status', orderCtrl.updateStatus);
router.post('/save-design', orderCtrl.saveTempDesign);
router.post('/order/update-preview', orderCtrl.updateOrderPreview); 
router.post('/orders/resume-design', orderCtrl.resumeOrderDesign);
router.post('/order/update-status', orderCtrl.updateOrderStatus);
router.post('/orders/finalize/:temp_order_id', orderCtrl.finalizeOrder);
router.delete('/admin/cleanup-expired-order/:id', orderCtrl.cleanupExpiredOrder);

// --- CHAT & TIMER ---
router.get('/chat/:orderId', chatCtrl.getChatHistory);
router.get('/order/:orderId', chatCtrl.getOrderDetails);
router.post('/order/extend-expiry', chatCtrl.extendExpiry);

// Route for getting unread notification stats
router.get('/notifications', chatCtrl.getUnreadNotifications);

// Route to mark messages as read when chat opens
router.post('/mark-read', chatCtrl.markAsRead);

// --- CUSTOMERS ---
router.get('/admin/customers', customerController.getAllCustomers);

// --- CATEGORIES ---
router.get('/categories', productController.getAllCategories);
router.post('/categories', productController.addCategory);
router.delete('/categories/:id', productController.deleteCategory);
router.put('/categories/:id', productController.updateCategory);

// --- PRODUCTS ---
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/:id', productController.getProductById);

// --- PORTFOLIO & PROJECTS ---
router.get('/projects', projCtrl.getAllProjects);
router.post('/projects', projCtrl.addProject);
router.put('/projects/:id', projCtrl.updateProject);
router.delete('/projects/:id', projCtrl.deleteProject);

// --- REVIEWS ---
router.get('/reviews', projCtrl.getAllReviews); 
router.patch('/reviews/:id/status', projCtrl.updateReviewStatus);
router.get('/reviews/approved', projCtrl.getApprovedReviews);
router.post('/reviews', projCtrl.submitReview);

// --- PRODUCT LISTS ---
router.get('/product-list', projCtrl.getProductList);
router.post('/product-list', projCtrl.addProductToList);
router.delete('/product-list/:id', projCtrl.deleteProductFromList);

// --- PORTFOLIO CATEGORIES & CONTACT ---
router.get('/portfolio-categories', projCtrl.getPortfolioCategories);
router.post('/portfolio-categories', projCtrl.addPortfolioCategory);
router.delete('/portfolio-categories/:id', projCtrl.deletePortfolioCategory);
router.get('/contact-subjects', projCtrl.getContactSubjects);
router.post('/contact-subjects', projCtrl.addContactSubject);
router.delete('/contact-subjects/:id', projCtrl.deleteContactSubject);

module.exports = router;