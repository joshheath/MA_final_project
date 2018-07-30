import React from 'react';
import { Component } from 'react'

class Hashtag extends React.Component {
    constructor(props) {
        super(props);
        this.renderHashtags = (hashtag, index) => {
          return <li key={index}>{hashtag}</li>
        }
    }
    render() {
      return <ul>{this.props.hashtags.map(this.renderHashtags)}</ul>
    }
  }

  export default Hashtag