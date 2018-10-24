import React, {Component} from 'react';
import CustomerList from './CustomerList';

class CustomerContainer extends Component {

  constructor(props){
    super(props);
    this.state = {customers: []}


    this.sortCustomersByBookingCountDesc = this.sortCustomersByBookingCountDesc.bind(this);
    this.sortCustomersByBookingCountAsc = this.sortCustomersByBookingCountAsc.bind(this);
    this.url = props.url;

  }

  componentDidMount(){
      fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        if(data._embedded){
        this.setState({customers: data._embedded.customers})

      } else {
        this.setState({customers: [data]})
      }
    })
  }


    sortCustomersByBookingCountDesc(){
    const orderedCustomers =  this.state.customers.sort(function(a, b){
        return b.bookings.length - a.bookings.length});
        this.setState({customers: orderedCustomers});
      }

      sortCustomersByBookingCountAsc(){
      const orderedCustomers =  this.state.customers.sort(function(a, b){
          return a.bookings.length - b.bookings.length});
          this.setState({customers: orderedCustomers});
        }


  render() {

    return (
      <div>
        <button  className="customer-button" onClick={this.sortCustomersByBookingCountDesc}>Sort By No. of Bookings (desc)</button>
      <button className="customer-button" onClick={this.sortCustomersByBookingCountAsc}>Sort By No. of Bookings (asc)</button>
      <CustomerList customers={this.state.customers}/>
    </div>
    )
  }

}

export default CustomerContainer;
