import { useContext } from "react";
import Tab from "./Tab";
import { ToolbarPopupContext } from "./ToolbarPopup";

type Props = {
    signOutUser: () => void,
}

function RightToolbar({ signOutUser }: Props) {
    const popup = useContext(ToolbarPopupContext);

    return (
        <div className="toolbar-elements">
            <Tab
                text="My Tests"
                route="/my-tests"
            />
            <Tab
                text="Sign out"
                onClick={() => {
                    // Sign out.
                    signOutUser();

                    // Close the pop-up.
                    popup?.close();
                }}
            />
        </div>
    );
}

export default RightToolbar;