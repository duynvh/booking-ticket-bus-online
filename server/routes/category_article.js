var router = require('express').Router();
var categoryArticle = require('../controllers/categoryArticleController');

router.delete('/:id',categoryArticle.deleteCategoryArticle);
router.put('/:id',categoryArticle.updateCategoryArticle);
router.post('/', categoryArticle.createCategoryArticle);
router.get('/', categoryArticle.listCategoryArticle);
router.get('/:id', categoryArticle.readCategoryArticle);
router.get('/get-by-slug/:slug', categoryArticle.readCategoryArticleBySlug);
module.exports = router;
