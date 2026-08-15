import "./Toolbar.css";

import type { UserDetails } from '../../api';
import { useRef, useState } from "react";
import Profile from "../profile";

import LeftToolbar from "./LeftToolbar";
import RightToolbar from "./RightToolbar";
import Tab from "./Tab";
import ToolbarPopup from "./ToolbarPopup";

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
                                strokeWidth="5"
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
            <ToolbarPopup
                className="toolbar-left-popup"
                show={showLeftToolbarPopup}
                setShow={setShowLeftToolbarPopup}
                origin={menuButtonRef}
            >
                <LeftToolbar />
            </ToolbarPopup>
            <ToolbarPopup
                className="toolbar-right-popup"
                show={showRightToolbarPopup}
                setShow={setShowRightToolbarPopup}
                origin={profileRef}
            >
                <RightToolbar signOutUser={signOutUser} />
            </ToolbarPopup>
        </div>
    );
}

export default Toolbar;