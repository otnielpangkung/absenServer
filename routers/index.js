const router = require('express').Router();
const webRouter = require('./webRouter');
const mobileRouter = require('./mobileRouter');

router.use('/web', webRouter);
router.use('/mobile', mobileRouter);

module.exports = router;
