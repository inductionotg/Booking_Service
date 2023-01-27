const express = require('express')
const {BookingController} = require('../../controller/index')
const router = express.Router()

router.post('/booking',BookingController.createBooking)


module.exports = router;