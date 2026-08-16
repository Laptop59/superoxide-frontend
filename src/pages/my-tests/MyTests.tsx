import { useState } from "react";
import { Button } from "../../components/ui";
import CreateNewTestModal from "./CreateNewTestModal";
import "./MyTests.css";

import {
    PiPlusCircleBold
} from "react-icons/pi";
import { myTests, useFetchState } from "../../api";
import TestBox from "./TestBox";

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
                <TestBox
                    userTests={userTests}
                    retryUserTests={retryUserTests}
                />
            </div>
            <CreateNewTestModal
                isOpen={isCreateNewTestOpen}
                setIsOpen={setIsCreateNewTestOpen}
            />
        </div>
    )
}

export default MyTests;