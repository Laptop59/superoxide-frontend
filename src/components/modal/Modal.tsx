import type React from "react";

import ReactModal from "react-modal";

import "./Modal.css";
import { PiXBold } from "react-icons/pi";

type Props = {
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
    className?: string,
    title: string
};

function Modal({
    children,
    isOpen,
    setIsOpen,
    className = "",
    title
}: Props) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className={className + " modal"}
            style={{
                overlay: {
                    backgroundColor: '#11111177'
                }
            }}
        >
            <div className="modal-box">
                <div className="modal-header">
                    <h1>{title}</h1>
                    <button
                        className="modal-close"
                        onClick={() => setIsOpen(false)}
                    >
                        <PiXBold size={24} />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </ReactModal>
    )
}

export default Modal;