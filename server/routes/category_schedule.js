var router = require('express').Router();
var categorySchedule = require('../controllers/categoryScheduleController');

router.delete('/:id',categorySchedule.deleteCategorySchedule);
router.put('/:id',categorySchedule.updateCategorySchedule);
router.post('/', categorySchedule.createCategorySchedule);
router.get('/', categorySchedule.listCategorySchedule);
router.get('/active', categorySchedule.listCategoryScheduleActive);
router.get('/:id', categorySchedule.readCategorySchedule);
router.get('/get-by-slug/:slug', categorySchedule.readCategoryScheduleBySlug);
module.exports = router;
