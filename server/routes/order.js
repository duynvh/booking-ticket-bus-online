var router = require('express').Router();
var order = require('../controllers/orderController');

router.post('/', order.createOrder);
router.get('/', order.listOrder);
router.get('/get-by-date/:schedule_detail_id/:date', order.getListOrderByScheduleDetailAndDate);
router.get('/get/:date', order.getListOrder);
router.post('/payment', order.createCharge);
router.get('/dashboard', order.dashboard);
module.exports = router;
