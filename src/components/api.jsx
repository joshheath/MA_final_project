import React from 'react';
import { Component } from 'react'

class Api extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="Api">
        <header className="Api-header">
          <h1 className="Api-title">Welcome to React</h1>
        </header>
        <p className="Api-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default Api
