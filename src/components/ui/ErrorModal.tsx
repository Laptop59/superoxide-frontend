import "./ErrorModal.css";

import errorIcon from "../../assets/error_icon.svg";

type Props = {
    error: unknown
}

function ErrorModal({ error }: Props) {
    return (
        error ? <div className='error-modal'>
            <img src={errorIcon} />
            <span>{ error instanceof Error ? error.message : String(error) }</span>
        </div> : <></>
    );
}

export default ErrorModal;