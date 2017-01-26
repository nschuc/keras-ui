import React from "react";

const AddLayerModal = props => {
  const { x, y, opacity } = props;

  const styles = {
    top: y,
    left: x,
    opacity: opacity,
    transform: 'translate(-50%, -50%)'

  };

  return (
    <div className="dib absolute z-1 bg-white shadow-3 br3 ba b--silver" style={styles}>
      <div className="pa3 black-80">
        <div className="measure">
          <label htmlFor="name" className="f6 db mb2">Name <span className="normal black-60">(optional)</span></label>
          <input id="name" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" />
        </div>
      </div>
    </div>
  );
};

export default AddLayerModal
