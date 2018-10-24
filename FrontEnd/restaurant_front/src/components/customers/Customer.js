import React from 'react';
import moment from 'moment';

const Customer = (props) => {

  const url = "/customers/" + props.customer.id
  const editUrl = "/customers/" + props.customer.id + "/edit"

  const bookings = props.customer.bookings.map((booking, index) => {
    console.log(booking);
    let date = new Date(booking.date);
    let formattedDate = moment(date).format("DD/MM/YY HH:mm");
    return <li key={index}>{formattedDate}</li>
	})

return (
  <div className="customer-component">
    <a href={url}>
      <p className="customer-name">
        ({props.customer.id}) <strong>Name: </strong>  {props.customer.name}
      </p>
    </a>
    <p className="customer-number">
      <strong>Phone Number: </strong> {props.customer.number}
    </p>
    <p className="customer-bookings"><strong>Bookings:  </strong>{bookings}</p>
    <a href={editUrl}>
      <p>Edit Customer Details</p>
    </a>
  </div>
)
	}

export default Customer;
