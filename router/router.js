const router = require('express').Router();
const contactsRouter = require('./contacts.router');
const authRouter = require('./auth.router');

router.use('/api', contactsRouter);

router.post('/auth', authRouter);

module.exports = router;
