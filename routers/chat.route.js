const router = require('express').Router();

const chat = require('../controllers/chatController');

router.post('/sendMessage', chat.messageUser);
router.get('/getAllMessage', chat.getAllMessages)

module.exports = router
