import React, { useEffect, useRef, useState } from "react";
import ListenForOutsideClicks from "./ListenForOutsideClicks";

export default function Modal(props) {
    const { children, setModal, size, disableOutsideClick } = props;

    return (
        <div className="modal-background">
            <ListenForOutsideClicks disabled={disableOutsideClick} action={() => setModal(false)}>
                <div className="modal-container" style={{ height: size }}>
                    <button
                        className="x-button x-button-modal"
                        onClick={() => setModal(false)}
                    >
                        X
                    </button>
                    {children}
                </div>
            </ListenForOutsideClicks>
        </div>
    );
}
