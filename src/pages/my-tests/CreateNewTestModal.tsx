import { useState } from "react";
import Modal from "../../components/modal";
import { Button, TextField } from "../../components/ui";
import ChoicesField from "../../components/ui/ChoicesField";
import { PiPlusCircleBold } from "react-icons/pi";
import type { TestType } from "../../api";

type Props = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
};

function CreateNewTestModal({
    isOpen,
    setIsOpen
}: Props) {
    const [selectedTestType, setSelectedTestType] = useState<TestType>();

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className="create-new-test-modal"
            title="Create New Test"
        >
            <span>Fill in the required details to start creating a test!</span>
            <TextField
                title="Test Name"
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
            />
            <Button
                className="my-tests-new"
            ><PiPlusCircleBold size={24}/> Create New Test</Button>
        </Modal>
    )
}

export default CreateNewTestModal;