import type { TestType } from "../../api";
import TestIcon from "../../assets/test_icon.svg?react";
import { Button } from "../../components/ui";

import {
    PiClockClockwiseBold,
    PiPencilBold,
    PiQuestionBold,
    PiTrashBold
} from "react-icons/pi";

type Props = {
    id: string
    name: string,
    type: TestType,
    updatedAt: string,
    deleteTest: (id: string, name: string) => void,
};

function TestEntry({
    id,
    name,
    type,
    updatedAt,
    deleteTest
}: Props) {
    return (
        <div className="my-tests-test-entry">
            <div className="my-tests-test-entry-content">
                <div className="my-tests-test-icon">
                    <TestIcon />
                </div>
                <div className="my-tests-test-info">
                    <h3>{name}</h3>
                    <div className="my-tests-test-info-text">
                        <PiQuestionBold size={16}/>
                        <span>Type: {type}</span>
                    </div>
                    <div className="my-tests-test-info-text">
                        <PiClockClockwiseBold size={16}/>
                        <span>Last Updated: {updatedAt}</span>
                    </div>
                </div>
                <div className="my-tests-test-options">
                    <Button className="my-tests-edit">
                        <PiPencilBold />
                        Edit
                    </Button>
                    <Button className="my-tests-delete" onClick={() => deleteTest(id, name)}>
                        <PiTrashBold />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TestEntry;