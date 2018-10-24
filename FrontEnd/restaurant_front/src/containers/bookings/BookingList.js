import React from 'react';
import moment from 'moment';
import Booking from '../../components/bookings/Booking.js';

const BookingList = (props) => {

  const filteredFormattedDate = moment(props.searchDate).format("DD-MM-YY")

  const allBookings = props.bookings.map((booking) => {
    return (<li  key={booking.id} className="booking-component-item">
      <Booking booking={booking} duration={booking.duration}/>
    </li>
  )
})

const selectedBooking = allBookings.filter((booking) => {
  const filteredBookingDate = moment(booking.props.children.props.booking.date).format("DD-MM-YY");
  if (filteredBookingDate === filteredFormattedDate){
    return <Booking booking={booking} key={booking.id} />
  }
})


if(props.searchDate === null){
  return (
    <div>
      <h2> All bookings: </h2>
      <ul className="booking-component-list">
        {allBookings}
      </ul>

    </div>
  )
}
else{
  return (
    <div>
      <h2> All bookings for {filteredFormattedDate}: </h2>



      <ul className="booking-component-list">
        {selectedBooking}
      </ul>
    </div>
  )
}
}

export default BookingList;
