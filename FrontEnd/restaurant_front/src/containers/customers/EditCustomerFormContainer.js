import React, {Component} from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

class EditCustomerFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {customers: []}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    let value = event.target.value
    let name = event.target.name

    let customersCopy = Object.assign({}, this.state.customers);
    customersCopy[name] = value;
    this.setState({ customers: customersCopy })
  }


  handleSubmit(event){
    event.preventDefault();
    fetch(this.props.url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "name": event.target.name.value,
        "number": event.target.number.value
      })
    })
    .then(() => {
      window.location="/customers";
    })
  }



  componentDidMount(){
    fetch(this.props.url)
    .then((res) => res.json())
    .then((data) => {
      this.setState({customers: data})
      console.log(data);
    })
  }

    render(){
      return(
        <div className="customerFormContainer">
          <div className="row">
            <Form horizontal onSubmit={this.handleSubmit}>

              <FormGroup bsSize="large" controlId="customerForm">
                <Col className="font" componentClass={ControlLabel} smOffset={1} sm={4}> {' '}
                  <strong className="font">Name: </strong>
                </Col>
                <Col sm={4}>
                  <FormControl type="text" value={this.state.customers.name} onChange={this.handleChange} name="name"/>
                </Col>
              </FormGroup>{' '}

              <FormGroup bsSize="large" controlId="customerForm">
                <Col className="font" componentClass={ControlLabel} smOffset={1} sm={4}> {' '}
                  <strong className="font">Contact Number: </strong>
                </Col>
                <Col sm={4}>
                  <FormControl type="text" value={this.state.customers.number} onChange={this.handleChange} name="number"/>
                </Col>
              </FormGroup>{' '}

              <FormGroup>
                <Col smOffset={5} sm={5}>
                  <Button className="submit" type="submit">Save Edited Details</Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
          <img className="cutlery" src="/images/cutlery.jpg" alt=""/>
        </div>
      )
    }

  };

  export default EditCustomerFormContainer;
