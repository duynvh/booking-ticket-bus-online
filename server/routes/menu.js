var router = require('express').Router();
var menu = require('../controllers/menuController');

router.delete('/:id',menu.deleteMenu);
router.put('/:id',menu.updateMenu);
router.post('/', menu.createMenu);
router.get('/', menu.listMenu);
router.get('/:id', menu.readMenu);

module.exports = router;
