import React, { Component} from 'react';

export default class Link extends Component{

  render() {
    return (
      <line { ...this.props }
        strokeWidth="2" stroke="black"
        />
    );
  }
}
