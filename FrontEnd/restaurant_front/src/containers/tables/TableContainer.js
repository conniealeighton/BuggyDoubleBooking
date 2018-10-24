import React, {Component} from 'react';

class TableContainer extends Component {

  constructor(props){
    super(props);
    this.state = {tables: []}

    this.url = props.url;

  }

  componentDidMount(){
      fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        if(data._embedded){
        this.setState({tables: data._embedded.customers})

      } else {
        this.setState({tables: [data]})
      }
    })
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default TableContainer;
