var router = require('express').Router();
var contact = require('../controllers/contactController');

router.delete('/:id',contact.deleteContact);
router.put('/:id',contact.updateContact);
router.post('/', contact.createContact);
router.get('/', contact.listContact);
router.get('/:id', contact.readContact);

module.exports = router;
