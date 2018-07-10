var router = require('express').Router();
var province = require('../controllers/provinceController');

router.delete('/:id',province.deleteProvince);
router.put('/:id',province.updateProvince);
router.post('/', province.createProvince);
router.get('/', province.listProvince);
router.get('/:id', province.readProvince);

module.exports = router;
