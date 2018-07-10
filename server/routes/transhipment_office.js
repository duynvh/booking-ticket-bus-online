var router = require('express').Router();
var transhipmentOffice = require('../controllers/transhipmentOfficeController');

router.delete('/:id',transhipmentOffice.deleteTranshipmentOffice);
router.put('/:id',transhipmentOffice.updateTranshipmentOffice);
router.post('/', transhipmentOffice.createTranshipmentOffice);
router.get('/', transhipmentOffice.listTranshipmentOffice);
router.get('/:id', transhipmentOffice.readTranshipmentOffice);
router.get('/get-by/:id', transhipmentOffice.listTranshipmentOfficeByRouteDeparture);
module.exports = router;
