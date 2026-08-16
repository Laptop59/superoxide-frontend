import type { FetchState, MyTestsEntry } from "../../api"
import { Button } from "../../components/ui";
import TestEntry from "./TestEntry";

type Props = {
    userTests: FetchState<MyTestsEntry[]>,
    retryUserTests: () => void
};

function TestBox({
    userTests,
    retryUserTests
}: Props) {
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
                const test = value[i];
                elements.push(
                    <TestEntry
                        id={test.id}
                        key={test.id}
                        name={test.name}
                        type={test.type}
                        updatedAt={test.updated_at}
                    />
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

export default TestBox;