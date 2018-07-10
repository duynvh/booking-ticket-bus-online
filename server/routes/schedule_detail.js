var router = require('express').Router();
var scheduleDetail = require('../controllers/scheduleDetailController');

router.delete('/:id',scheduleDetail.deleteScheduleDetail);
router.put('/:id',scheduleDetail.updateScheduleDetail);
router.post('/', scheduleDetail.createScheduleDetail);
router.get('/', scheduleDetail.listScheduleDetail);
router.get('/:id', scheduleDetail.readScheduleDetail);

router.get('/get-by-slug/:slug', scheduleDetail.listScheduleDetailBySlug);

module.exports = router;
