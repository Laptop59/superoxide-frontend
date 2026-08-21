import { useState } from "react";
import Modal from "../../components/modal";
import { Button, TextField } from "../../components/ui";
import ChoicesField from "../../components/ui/ChoicesField";
import { PiPlusCircleBold } from "react-icons/pi";
import { createTest, type TestType } from "../../api";
import ErrorModal from "../../components/ui/ErrorModal";

type Props = {
    isOpen: boolean,
    close: () => void
};

function CreateNewTestModal({
    isOpen,
    close
}: Props) {
    const [selectedTestType, setSelectedTestType] = useState<TestType | null>(null);
    const [testName, setTestName] = useState<string>("");
    const [error, setError] = useState<unknown>(null);

    const [responseAwaiting, setResponseAwaiting] = useState(false);

    const sendRequest = async function() {
        if (!responseAwaiting) {
            setResponseAwaiting(true);
            setError(null);
            try {
                await createTest(testName, selectedTestType!);

                // We don't set responseAwaiting because we're waiting for
                // the page to refresh.
            } catch(e) {
                setError(e);
                setResponseAwaiting(false);
            }
        }
    }

    const creationDisabled = responseAwaiting || testName.trim().length == 0 || selectedTestType === null;
    
    return (
        <Modal
            isOpen={isOpen}
            close={close}
            className="create-new-test-modal"
            title="Create New Test"
        >
            <span>Fill in the required details to start creating a test!</span>
            <ErrorModal error={error} />
            <TextField
                title="Test Name"
                value={testName}
                maxLength={255}
                onChange={e => setTestName(e.target.value)}
                disabled={responseAwaiting}
            />
            <ChoicesField
                title="Test Type"
                choices={[
                    {
                        id: "objective",
                        name: "Objective"
                    },
                    {
                        id: "subjective",
                        name: "Subjective"
                    }
                ]}
                selected={selectedTestType}
                setSelected={setSelectedTestType}
                disabled={responseAwaiting}
            />
            <Button
                className="my-tests-new"
                disabled={creationDisabled}
                onClick={sendRequest}
            ><PiPlusCircleBold size={24}/> Create New Test</Button>
        </Modal>
    )
}

export default CreateNewTestModal;