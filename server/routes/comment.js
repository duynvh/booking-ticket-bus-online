var router = require('express').Router();
var comment = require('../controllers/commentController');

router.delete('/:id',comment.deleteComment);
router.put('/:id',comment.updateComment);
router.post('/', comment.createComment);
router.get('/', comment.listComment);
router.get('/:id', comment.readComment);

module.exports = router;
