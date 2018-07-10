var router = require('express').Router();
var article = require('../controllers/articleController');

router.delete('/:id',article.deleteArticle);
router.put('/:id',article.updateArticle);
router.post('/', article.createArticle);
router.get('/', article.listArticle);
router.get('/:id', article.readArticle);
router.get('/get-by-slug/:slug', article.readArticleBySlug);
module.exports = router;
