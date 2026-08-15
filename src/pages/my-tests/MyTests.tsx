import { useState } from "react";
import { Button } from "../../components/ui";
import CreateNewTestModal from "./CreateNewTestModal";
import "./MyTests.css";

import {
    PiPlusCircleBold
} from "react-icons/pi";
import { myTests, useFetchState, type FetchState, type MyTestsEntry } from "../../api";
import TestEntry from "./TestEntry";

function MyTests() {
    const [isCreateNewTestOpen, setIsCreateNewTestOpen] = useState(false);
    const [userTests, retryUserTests] = useFetchState(myTests);

    return (
        <div className="my-tests">
            <h1>My Tests</h1>
            <div className="my-tests-content">
                <div className="my-tests-header">
                    <div>
                        <span className="my-tests-header-test-counter">
                            {userTests.status == "fetched" ? `Tests: ${userTests.value.length}` : "Tests"}
                        </span>
                    </div>
                    <div>
                        <Button
                            className="my-tests-new"
                            onClick={() => setIsCreateNewTestOpen(true)}
                        >
                            <PiPlusCircleBold size={24}/> Create New Test
                        </Button>
                    </div>
                </div>
                {
                    createTestsBox(userTests, retryUserTests)
                }
            </div>
            <CreateNewTestModal
                isOpen={isCreateNewTestOpen}
                setIsOpen={setIsCreateNewTestOpen}
            />
        </div>
    )
}

function createTestsBox(
    userTests: FetchState<MyTestsEntry[]>,
    retryUserTests: () => void
) {
    switch (userTests.status) {
        case "loading":
            return (
                <div className="my-tests-box">
                    <h3>Loading your tests...</h3>
                </div>
            );

        case "fetched": {
            const {value} = userTests;

            if (value.length == 0) {
                return (
                <div className="my-tests-box">
                    <h3>No tests found.</h3>
                    <p>When you create tests, they will be shown here.</p>
                </div>
            );
            }

            const elements = [];

            for (let i = 0; i < value.length; i++) {
                elements.push(
                    <TestEntry key={i}/>
                );
                if (i + 1 != value.length) {
                    elements.push(
                        <div className="my-tests-test-entry-separator"/>
                    );
                }
            }

            return (
                <div className="my-tests-box">
                    {elements}
                </div>
            );
        }

        case "errored":
            return (
                <div className="my-tests-box">
                    <h3>Could not load your tests.</h3>
                    <Button onClick={retryUserTests}>Retry</Button>
                </div>
            );
    }
}

export default MyTests;