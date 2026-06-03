import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.svg';
import Tab from "./Tab";

type Props = {
    close?: () => void,
}

function LeftToolbar({ close }: Props) {
    const navigate = useNavigate();

    return (
        <div className="toolbar-elements">
            <button className='logo' onClick={() => {
                navigate("/");
            }}>
                <img
                    src={logo}
                    alt="Superoxide Logo"
                />
            </button>
            <div className="toolbar-tabs">
                <Tab
                    text="Discover"
                    route="/discover"
                    onClick={close}
                />
                <Tab
                    text="Groups"
                    route="/groups"
                    onClick={close}
                />
            </div>
        </div>
    );
}

export default LeftToolbar;