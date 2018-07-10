var express = require('express');
var router = express.Router();
var authenticator = require('../controllers/authenticator');
var passportService = require('../services/passport');
var passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

/* GET home page. */
router.get('/', requireAuth, function(req, res, next) {
  res.send({title: 'ABCDEFGH'});
});

router.post('/signin', requireSignin, authenticator.signin);

module.exports = router;
