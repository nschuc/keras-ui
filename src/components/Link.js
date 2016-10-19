import React, { Component} from 'react';

export default class Link extends Component{

  render() {
    const {
      label, points
    } = this.props.edge;
    const [ u, control, v ] = points
    return (
      <line x1={u.x} y1={u.y} x2={v.x} y2={v.y}
        strokeWidth="2" stroke="black"
        className={`rv-force__link`}
        />
    );
  }
}
