import TestIcon from "../../assets/test_icon.svg?react";
import { Button } from "../../components/ui";

import {
    PiClockClockwiseBold,
    PiPencilBold,
    PiQuestionBold,
    PiTrashBold
} from "react-icons/pi";

function TestEntry() {
    return (
        <div className="my-tests-test-entry">
            <div className="my-tests-test-entry-content">
                <div className="my-tests-test-icon">
                    <TestIcon />
                </div>
                <div className="my-tests-test-info">
                    <h3>Test XYZ</h3>
                    <div className="my-tests-test-info-text">
                        <PiQuestionBold size={16}/>
                        <span>Type: Objective</span>
                    </div>
                    <div className="my-tests-test-info-text">
                        <PiClockClockwiseBold size={16}/>
                        <span>Last Updated: EEEEEEEE</span>
                    </div>
                </div>
                <div className="my-tests-test-options">
                    <Button className="my-tests-edit">
                        <PiPencilBold />
                        Edit
                    </Button>
                    <Button className="my-tests-delete">
                        <PiTrashBold />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TestEntry;