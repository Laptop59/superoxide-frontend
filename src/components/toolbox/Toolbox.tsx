import "./Toolbox.css";

import type { UserDetails } from '../../api';
import logo from '../../assets/logo.svg';
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../profile";

type Props = {
    user?: UserDetails
};

function Toolbox({
    user
}: Props) {
    const navigate = useNavigate();
    const toolbarRef = useRef<HTMLDivElement>(null);

    return (
        <div className='toolbar' ref={toolbarRef}>
            <button className='logo' onClick={() => {
                navigate("/");
            }}>
                <img
                    src={logo}
                    alt="Superoxide Logo"
                />
            </button>
            <div className='toolbar-compressible'>
                <div className="toolbar-left">
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

export default Toolbox;