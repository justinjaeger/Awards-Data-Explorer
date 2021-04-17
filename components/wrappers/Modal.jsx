import React, { useEffect, useRef, useState } from 'react';
import ListenForOutsideClicks from 'components/wrappers/ListenForOutsideClicks';

export default function Modal(props) {

  const { children, setModal, size } = props;

  return(
    <div className="modal-background">
      <ListenForOutsideClicks action={() => setModal(false)}>
        <div className="modal-container" style={{height: size}} >
          <button className="x-button x-button-modal" onClick={() => setModal(false)} >X</button>
          {children}
        </div>
      </ListenForOutsideClicks>
    </div>
  )
}