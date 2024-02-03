const router = require('express').Router()
const chatRouter = require('../routers/chat.route')
const userRouter = require('../routers/user.route')

router.use('/', userRouter)
router.use('/', chatRouter)

module.exports = router;