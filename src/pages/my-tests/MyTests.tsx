import { Button } from "../../components/ui";
import "./MyTests.css";
import TestEntry from "./TestEntry";

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
                        <Button className="my-tests-new">Create New Test</Button>
                    </div>
                </div>
                <div className="my-tests-box">
                    <TestEntry />
                    <TestEntry />
                    <TestEntry />
                </div>
            </div>
        </div>
    )
}

export default MyTests;