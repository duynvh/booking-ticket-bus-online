var router = require('express').Router();
var slider = require('../controllers/sliderController');

router.delete('/:id',slider.deleteSlider);
router.put('/:id',slider.updateSlider);
router.post('/', slider.createSlider);
router.get('/', slider.listSlider);
router.get('/:id', slider.readSlider);

module.exports = router;
