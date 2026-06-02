import "./Toolbar.css";

import type { UserDetails } from '../../api';
import logo from '../../assets/logo.svg';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../profile";

import { CSSTransition } from "react-transition-group";

type Props = {
    user?: UserDetails
    signOutUser: () => void
};

function Toolbar({
    user,
    signOutUser
}: Props) {
    const toolbarRef = useRef<HTMLDivElement>(null);
    
    const [showLeftToolbarPopup, setShowLeftToolbarPopup] = useState(false);
    const [showRightToolbarPopup, setShowRightToolbarPopup] = useState(false);

    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const profileRef = useRef<HTMLButtonElement>(null);

    return (
        <div className='toolbar' ref={toolbarRef}>
            <div className='toolbar-compressible'>
                <div className="toolbar-left">
                    <LeftToolbar />
                    <button
                        className='toolbar-menu-button'
                        onClick={() => setShowLeftToolbarPopup(s => !s)}
                        ref={menuButtonRef}
                    >
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
                            <Profile
                                user={user}
                                onClick={() => setShowRightToolbarPopup(s => !s)}
                                ref={profileRef}
                            /> :
                            <Tab
                                text="Sign in"
                                route="/auth"
                            />
                    }
                </div>
            </div>
            <LeftToolbarPopup
                show={showLeftToolbarPopup}
                setShow={setShowLeftToolbarPopup}
                origin={menuButtonRef}
            />
            <RightToolbarPopup
                show={showRightToolbarPopup}
                setShow={setShowRightToolbarPopup}
                origin={profileRef}
                signOutUser={signOutUser}
            />
        </div>
    );
}

type PopupProps = {
    show: boolean,
    setShow: (show: boolean) => void,
    origin: React.RefObject<HTMLButtonElement | null>
};

function LeftToolbarPopup({
    show,
    setShow,
    origin
}: PopupProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            const target = event.target as Node | null;

            if (
                !nodeRef.current?.contains(target) &&
                !origin.current?.contains(target)
            ) {
                // Close the pop-up
                setShow(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, []);

    return (
        <CSSTransition
            in={show}
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

type RightPopupProps = PopupProps & {
    signOutUser: () => void
};

function RightToolbarPopup({
    show,
    setShow,
    origin,
    signOutUser
}: RightPopupProps) {
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            const target = event.target as Node | null;

            if (
                !nodeRef.current?.contains(target) &&
                !origin.current?.contains(target)
            ) {
                // Close the pop-up.
                setShow(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, []);

    const navigate = useNavigate();

    return (
        <CSSTransition
            in={show}
            nodeRef={nodeRef}
            timeout={300}
            classNames="toolbar-right-popup"
            mountOnEnter
            unmountOnExit
        >
            <div className="toolbar-right-popup" ref={nodeRef}>
                <Tab
                    text="Sign out"
                    onClick={() => {
                        // Sign out.
                        signOutUser();

                        // Close the pop-up.
                        setShow(false);

                        // Go back to the main page.
                        navigate("/");
                    }}
                />
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
    route?: string,
    onClick?: () => void
};

function Tab({
    text,
    route,
    onClick
}: TabProps) {
    const navigate = useNavigate();

    const defaultOnClick = () => {
        if (route)
            navigate(route);
    };

    return (
        <button className='toolbar-tab' onClick={onClick || defaultOnClick}>{text}</button>
    );
}

export default Toolbar;