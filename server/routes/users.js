var router = require('express').Router();
var user = require('../controllers/userController');

router.delete('/:id',user.deleteUser);
router.put('/:id',user.updateUser);
router.post('/', user.createUser);
router.get('/', user.listUser);
router.get('/:id', user.readUser);
module.exports = router;