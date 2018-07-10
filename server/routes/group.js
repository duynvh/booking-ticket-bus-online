var router = require('express').Router();
var group = require('../controllers/groupController');

router.delete('/:id',group.deleteGroup);
router.put('/:id',group.updateGroup);
router.post('/', group.createGroup);
router.get('/', group.listGroup);
router.get('/:id', group.readGroup);

module.exports = router;
