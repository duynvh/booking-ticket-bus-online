var router = require('express').Router();
var schedule = require('../controllers/scheduleController');

router.delete('/:id',schedule.deleteSchedule);
router.put('/:id',schedule.updateSchedule);
router.post('/', schedule.createSchedule);
router.get('/', schedule.listSchedule);
router.get('/:id', schedule.readSchedule);
router.get('/get-by-slug/:slug', schedule.readScheduleBySlug);
router.get('/get-by/:id', schedule.listScheduleByCategorySchedule);

module.exports = router;
