import React, {Component} from 'react';
import moment from 'moment';


class BookingFormContainer extends Component{

  constructor(props){
    super(props);
    this.state = {customers: [], tables: []}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBookingsByTable = this.getBookingsByTable.bind(this);
    this.getEndTimeOfBooking = this.getEndTimeOfBooking.bind(this);
    this.getTimeFromDateStamp = this.getTimeFromDateStamp.bind(this)
  }

  getBookingsByTable(targetTableID) {
    // console.log("targetTable is: ", targetTableID);
    // console.log(this.props.bookingArray);
    var bookingsArray = [];
    for (var i = 0; i < this.props.bookingArray.length; i++) {
      if(this.props.bookingArray[i].table.id == targetTableID){
        console.log('FOUND', this.props.bookingArray[i]);
        bookingsArray.push(this.props.bookingArray[i]);
      }
    }
    // console.log("bookingsArray is: ", bookingsArray);
    return bookingsArray;

  }

  getEndTimeOfBooking(startTime, duration) {
    var endTime = moment(startTime).add(duration, 'm').toDate();
    return endTime;
    }

  checkIfOverlap(newStart, newEnd, oldStart, oldEnd){
    if ((newStart <= oldEnd) && (newEnd >= oldStart)) {
      return true;
    }
    else return false;
  }

  checkAgainstAllBookings(table, newStart, newEnd) {
    var bookingsArray = this.getBookingsByTable(table.id);
    for (var i = 0; i < bookingsArray.length; i++) {
      var endTime = this.getEndTimeOfBooking(i.date, i.duration);
      if (this.checkIfOverlap(newStart, newEnd, i.date, endTime)) {
      }
    }
    console.log("no overlap");
  }

  getTimeFromDateStamp(date){
    return moment(date).format("hh:mm:ss a")
  }


  componentDidMount(){
    fetch('/customers')
    .then((res) => res.json())
    .then((data) => {
      this.setState({customers: data._embedded.customers})
    })

    fetch('/tables')

    .then((res) => res.json())
    .then((data) => {
      this.setState({tables: data._embedded.tables})
    })
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("event target table", event.target.table);
    var bookingArray = this.getBookingsByTable(event.target.table.key);
    console.log("event target table", event.target.table.value);
    for (var i = 0; i < bookingArray.length; i++) {
      var existingStart = bookingArray[i].date;
      console.log(existingStart);
      var existingDuration = bookingArray[i].duration;
      var existingEndTime = this.getEndTimeOfBooking(existingStart, existingDuration);
      // console.log(event.target.date.value);
      var newStart = event.target.date.value;
      var newEnd = this.getEndTimeOfBooking(newStart, event.target.duration.value);
      if (this.checkIfOverlap(newStart, newEnd, existingStart, existingEndTime)) {
        console.log("overlap");
      }
      else {
        console.log("no overlap");
      }
    }
    // fetch("/bookings", {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     "customer": event.target.customer.value,
    //     "table": event.target.table.value,
    //     "date": event.target.date.value,
    //     "duration": event.target.duration.value
    //   })
    // })
    // .then(() => {
    //   window.location="/bookings";
    // })
  }




  render(){

    // console.log('props', this.props.bookingArray);
    const customerOptions = this.state.customers.map((customer, index) => {
      return <option key={index} value={customer._links.self.href}>{customer.name}</option>
    })

    const tableOptions = this.state.tables.map((table, index) => {
      return <option key={index} value={table._links.self.href}>{table.name}</option>
    })

    return(
      <div className="customer-component">
        <form onSubmit={this.handleSubmit}>
          <label for="date">Select Date & Time:</label>
          <input id="date" type="datetime-local" name="time_stamp"  required/>

          <label for="duration">Choose Duration:</label>
          <input id="duration" type="text" name="duration" required/>

          <select default="Select Customer" name="customer" id="customer">
            <option value="" disabled selected required>Select Customer</option>
            {customerOptions}
          </select>
          <select name="table" id="table">
            <option value="" disabled selected required>Select Table</option>
            {tableOptions}
          </select>


          <button type="submit">Save</button>
        </form>
      </div>


    )
  }


}

export default BookingFormContainer;
