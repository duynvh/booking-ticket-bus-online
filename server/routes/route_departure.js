var router = require('express').Router();
var routeDeparture = require('../controllers/routeDepartureController');

router.delete('/:id',routeDeparture.deleteRouteDeparture);
router.put('/:id',routeDeparture.updateRouteDeparture);
router.post('/', routeDeparture.createRouteDeparture);
router.get('/', routeDeparture.listRouteDeparture);
router.get('/:id', routeDeparture.readRouteDeparture);
router.get('/get-by-slug/:slug', routeDeparture.listRouteDepartureBySlug);
router.get('/get-by/:id', routeDeparture.listRouteDepartureByCategoryScheduleID);
module.exports = router;
