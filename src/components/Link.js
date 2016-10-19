import React, { Component} from 'react';

export default class Link extends Component{

  render() {
    const {
      source, target
    } = this.props;
    console.log(this.props)
    const { x1, y1 } = source;
    const { x2, y2 } = target;
    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        className={`rv-force__link`}
        />
    );
  }
}
