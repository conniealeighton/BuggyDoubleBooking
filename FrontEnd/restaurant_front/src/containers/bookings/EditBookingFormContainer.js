import React, {Component} from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

class EditBookingFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {bookings: null}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(event){
    let value = event.target.value
    let name = event.target.name

    let bookingsCopy = Object.assign({}, this.state.bookings);
    bookingsCopy[name] = value;
    this.setState({ bookings: bookingsCopy })
  }


  handleSubmit(event){
    event.preventDefault();
    console.log("submit is: ",event.target.date);
    fetch(this.props.url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "date": event.target.date.value,
        "duration": event.target.duration.value,
      })
    })
    .then(() => {
      window.location="/bookings";
    })
  }

  componentDidMount(){
    fetch(this.props.url)
    .then((res) => res.json())
    .then((data) => {
      this.setState({bookings: data})
      console.log("data is:", data.customer.name);
    })
  }

  render(){
    if (!this.state.bookings) return null;

    return(
      <div className="bookingFormContainer">
        <div className="row">
          <Form horizontal onSubmit={this.handleSubmit}>

            <FormGroup bsSize="large" controlId="bookingForm">
              <Col className="font" componentClass={ControlLabel} smOffset={1} sm={4}> {' '}
                <strong className="font">Booking Customer: {this.state.bookings.customer.name} </strong>
              </Col>
            </FormGroup>{' '}


            <FormGroup bsSize="large" controlId="bookingForm">
              <Col className="font" componentClass={ControlLabel} smOffset={1} sm={4}> {' '}
                <strong className="font">Change Booking Date: </strong>
              </Col>
              <Col sm={4}>
                <FormControl type="datetime-local" value={this.state.bookings.date} onChange={this.handleChange} name="date"/>
              </Col>
              <Col sm={4}>
                <FormControl type="text" value={this.state.bookings.duration} onChange={this.handleChange} name="duration"/>
              </Col>
            </FormGroup>{' '}

            <FormGroup>
              <Col smOffset={5} sm={5}>
                <Button className="submit" type="submit">Update Details</Button>
              </Col>
            </FormGroup>

          </Form>
        </div>
        <img className="cutlery" src="/images/cutlery.jpg" alt=""/>
      </div>
    )
  }

  };

  export default EditBookingFormContainer;
