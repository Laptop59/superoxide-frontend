import { Button } from "../../components/ui";
import "./MyTests.css";
import TestEntry from "./TestEntry";

import {
    PiPlusCircleBold
} from "react-icons/pi";

function MyTests() {
    return (
        <div className="my-tests">
            <h1>My Tests</h1>
            <div className="my-tests-content">
                <div className="my-tests-header">
                    <div>
                        <span className="my-tests-header-test-counter">Tests: 3</span>
                    </div>
                    <div>
                        <Button className="my-tests-new">
                            <PiPlusCircleBold size={24}/> Create New Test
                        </Button>
                    </div>
                </div>
                <div className="my-tests-box">
                    <TestEntry />
                    <div className="my-tests-test-entry-separator"/>
                    <TestEntry />
                    <div className="my-tests-test-entry-separator"/>
                    <TestEntry />
                </div>
            </div>
        </div>
    )
}

export default MyTests;