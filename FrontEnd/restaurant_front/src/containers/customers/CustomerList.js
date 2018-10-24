import React from 'react';
import Customer from '../../components/customers/Customer.js';

const CustomerList = (props) => {

  const allCustomers = props.customers.map((customer) => {
    return (<div key={customer.id} className="customer-component-item">
      <Customer customer={customer} />
    </div>
  )
  })

  return (
    <ul className="customer-component-list">
      {allCustomers}
    </ul>
  )
}

export default CustomerList;
