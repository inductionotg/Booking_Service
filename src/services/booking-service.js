const axios = require('axios')
const BookingRepository = require('../repository/booking-repository')
const {FLIGHT_SERVICE_PATH} = require('../config/server-config')
const { ServiceError } = require('../utils/errors')
class BookingService {
    constructor(){
        this.bookingRepository = new BookingRepository()
    }
    async createBooking(data){
        try {
            console.log(data)
            const flightId = data.flightId
            let urlFlightRequest = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            const response = await axios.get(urlFlightRequest)
            const flightData = response.data.data
            const flightPrice = flightData.price
            console.log(flightPrice,flightData.totalSeats)
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Cannot book the flight','Insufficient seats')
            }
            const totaPrice = data.noOfSeats * flightPrice
            const bookingPayload = {...data,totalCost:totaPrice}
            const booking = await this.bookingRepository.createBooking(bookingPayload)
            console.log("booking",booking)
            const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`
            await axios.post(updateFlightRequestUrl,{totalSeats:flightData.totalSeats - booking.noOfSeats})
            console.log(totaPrice)
            const finalBooking = await this.bookingRepository.update(booking.id,{status:'Booked'})
            return finalBooking
        } catch (error) {
            if(error.name === 'RepositoryError' || error.name ==='ValidationError'){
                throw error;
            }
            console.log("error",error)
            throw new ServiceError()
        }
    }
}

module.exports = BookingService