import type { UseQueryResult } from "@tanstack/react-query";
import type { MyTestsEntry } from "../../api"
import { Button } from "../../components/ui";
import TestEntry from "./TestEntry";

type Props = {
    userTests: UseQueryResult<NoInfer<MyTestsEntry[]>, Error>,
    retryUserTests: () => void,
    deleteTest: (id: string, name: string) => void
};

function TestBox({
    userTests,
    retryUserTests,
    deleteTest
}: Props) {
    switch (userTests.status) {
        case "pending":
            return (
                <div className="my-tests-box">
                    <h3>Loading your tests...</h3>
                </div>
            );

        case "success": {
            const {data} = userTests;

            if (data.length == 0) {
                return (
                    <div className="my-tests-box">
                        <h3>No tests found.</h3>
                        <p>When you create tests, they will be shown here.</p>
                    </div>
                );
            }

            const elements = [];

            elements.push(<TestEntrySeparator key={0}/>);
            for (const test of data) {
                elements.push(
                    <TestEntry
                        id={test.id}
                        key={test.id + "-entry"}
                        name={test.name}
                        type={test.type}
                        updatedAt={test.updated_at}
                        deleteTest={deleteTest}
                    />
                );
                elements.push(<TestEntrySeparator key={test.id + "-separator"}/>);
            }

            elements.pop(); // Delete the last separator.

            return (
                <div className="my-tests-box">
                    {elements}
                </div>
            );
        }

        case "error":
            return (
                <div className="my-tests-box">
                    <h3>Could not load your tests.</h3>
                    <Button onClick={retryUserTests}>Retry</Button>
                </div>
            );
    }
}

function TestEntrySeparator() {
    return <div className="my-tests-test-entry-separator"/>;
}

export default TestBox;