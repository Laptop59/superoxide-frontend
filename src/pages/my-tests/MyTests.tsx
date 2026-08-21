import { useState } from "react";
import { Button } from "../../components/ui";
import CreateNewTestModal from "./CreateNewTestModal";
import "./MyTests.css";

import {
    PiPlusCircleBold
} from "react-icons/pi";
import { myTests } from "../../api";
import TestBox from "./TestBox";
import DeleteTestModal from "./DeleteTestModal";
import { useQuery } from "@tanstack/react-query";

type DeletingTestInfo = {
    id: string,
    name: string
};

function MyTests() {
    const [isCreateNewTestOpen, setIsCreateNewTestOpen] = useState(false);
    const [deleteTestInfo, setDeleteTestInfo] = useState<DeletingTestInfo | null>(null);
    
    const userTests = useQuery({
        queryKey: ["my-tests"],
        queryFn: myTests
    });

    return (
        <div className="my-tests">
            <h1>My Tests</h1>
            <div className="my-tests-content">
                <div className="my-tests-header">
                    <div>
                        <span className="my-tests-header-test-counter">
                            {userTests.isSuccess ? `Tests: ${userTests.data.length}` : "Tests"}
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
                    retryUserTests={userTests.refetch}
                    deleteTest={(id, name) => setDeleteTestInfo({id, name})}
                />
            </div>
            <CreateNewTestModal
                isOpen={isCreateNewTestOpen}
                close={() => setIsCreateNewTestOpen(false)}
            />
            {deleteTestInfo !== null && <DeleteTestModal
                isOpen
                close={() => setDeleteTestInfo(null)}
                testId={deleteTestInfo.id}
                testName={deleteTestInfo.name}
                onSuccessfulTestDeletion={() => {
                    setDeleteTestInfo(null); // Close modal
                }}
            />}
        </div>
    )
}

export default MyTests;