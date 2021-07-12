import React, { SetStateAction } from "react";
import ListenForOutsideClicks from "./ListenForOutsideClicks";

type IModalProps = {
    setModal: React.Dispatch<SetStateAction<boolean>>;
    children?: JSX.Element;
    size?: number;
    disableOutsideClick?: boolean;
}
export default function Modal(props: IModalProps) {
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
