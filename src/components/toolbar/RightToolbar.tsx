import { useNavigate } from "react-router-dom";

import Tab from "./Tab";

type Props = {
    close?: () => void,
    signOutUser: () => void,
}

function RightToolbar({ close, signOutUser }: Props) {
    const navigate = useNavigate();

    return (
        <div className="toolbar-elements">
            <Tab
                text="Sign out"
                onClick={() => {
                    // Sign out.
                    signOutUser();

                    // Close the pop-up.
                    close?.();

                    // Go back to the main page.
                    navigate("/");
                }}
            />
        </div>
    );
}

export default RightToolbar;