import "./Toolbar.css";

import type { UserDetails } from '../../api';
import logo from '../../assets/logo.svg';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../profile";

import { CSSTransition } from "react-transition-group";

type Props = {
    user?: UserDetails
};

function Toolbar({
    user
}: Props) {
    const toolbarRef = useRef<HTMLDivElement>(null);
    
    const [showLeftToolbarPopup, setShowLeftToolbarPopup] = useState(false);

    return (
        <div className='toolbar' ref={toolbarRef}>
            <div className='toolbar-compressible'>
                <div className="toolbar-left">
                    <LeftToolbar />
                    <button className='toolbar-menu-button toolbar-left-do-not-compress' onClick={() => {
                        setShowLeftToolbarPopup(!showLeftToolbarPopup);
                    }}>
                        { /* This looks like a ≡ */ }
                        <svg viewBox="0 0 64 64">
                            <path
                                d="
                                    M 8 16 H 56
                                    M 8 32 H 56
                                    M 8 48 H 56
                                "
                                stroke="white"
                                stroke-width="5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="toolbar-right">
                    {
                        user ?
                            <Profile user={user}/> :
                            <Tab
                                text="Sign in"
                                route="/auth"
                            />
                    }
                </div>
            </div>
            <LeftToolbarPopup in={showLeftToolbarPopup} />
        </div>
    );
}

type LeftToolbarPopupProps = {
    in: boolean
};

function LeftToolbarPopup({ in: in_ }: LeftToolbarPopupProps) {
    const nodeRef = useRef(null);
    return (
        <CSSTransition
            in={in_}
            nodeRef={nodeRef}
            timeout={300}
            classNames="toolbar-left-popup"
            mountOnEnter
            unmountOnExit
        >
            <div className="toolbar-left-popup" ref={nodeRef}>
                <LeftToolbar />
            </div>
        </CSSTransition>
    );
}

function LeftToolbar() {
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
                />
                <Tab
                    text="Groups"
                    route="/groups"
                />
            </div>
        </div>
    );
}

type TabProps = {
    text: string,
    route: string
};

function Tab({
    text,
    route
}: TabProps) {
    const navigate = useNavigate();

    return (
        <button className='toolbar-tab' onClick={() => navigate(route)}>{text}</button>
    );
}

export default Toolbar;