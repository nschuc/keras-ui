import React, { Component, PropTypes } from 'react'
import './Layer.css'
import Draggable from 'react-draggable'

export default class Layer extends Component {
  propTypes: {
    onDrag: PropTypes.func
  }

  render() {
    const {
      name, config,
      class_name
    } = this.props;

    const layerProperties = Object.keys(config).map((key) => {
      if(config[key]) {
        return (
          <dl key={key} className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw7 ml0">{key}</dd>
            <dd className="f6 fw3 ml0">{config[key]}</dd>
          </dl>
          )
      }
    })

    const styles = {
      position: 'absolute',
      top: this.props.y,
      left: this.props.x,
      marginLeft: -this.props.width / 2,
      marginTop: -this.props.height / 2,
    }

    return (
      <Draggable>
				<div className="bg-white dib pointer" style={styles}>
					<div className="keras-layer br3 ba b--black-10">
						<div className="pv2 ph3">
							<h4 className="f6 ttu tracked">{class_name}</h4>
						</div>
						<div className="dn cf">
							{layerProperties}
						</div>
					</div>
				</div>
			</Draggable>
    );
  }
}
