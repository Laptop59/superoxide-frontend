import TestIcon from "../../assets/test_icon.svg?react";
import { Button } from "../../components/ui";

function TestEntry() {
    return (
        <div className="my-tests-test-entry">
            <div className="my-tests-test-entry-content">
                <div className="my-tests-test-icon">
                    <TestIcon />
                </div>
                <div className="my-tests-test-info">
                    <h3>Test XYZ</h3>
                    <span>Some info lol</span>
                </div>
                <div className="my-tests-test-options">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </div>
            </div>
            <div className="my-tests-test-entry-separator"/>
        </div>
    );
}

export default TestEntry;