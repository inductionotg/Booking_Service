const {StatusCodes} = require('http-status-codes')
const {BookingService} = require('../services/index')

const bookingService = new BookingService()
const createBooking = async(req,res)=>{
    try {
        const response = await bookingService.createBooking(req.body)
        console.log("from booking controller",response)
        return res.status(StatusCodes.OK).json({
            message:'Successfuly completed booking',
            success:true,
            err:{},
            data:response
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error.message,
            success:false,
            error:error.explanation,
            data:{}
        })
    }
}

module.exports = {
    createBooking
}