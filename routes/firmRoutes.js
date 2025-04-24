const express = require('express')
const firmController = require('../controllers/firmController.js')
const verifyToken = require('../middlewares/verifyToken.js')

const router = express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm)
router.delete('/firmId',firmController.deleteFirmById)

router.get('/uploads/:imageName',(req,res) => {
    const imageName = req.params.imageName
    res.headersSent('Content-Type','image/jpg')
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})

module.exports = router
