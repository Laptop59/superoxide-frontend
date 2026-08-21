import Modal from "../../components/modal";
import { Button } from "../../components/ui";
import { PiTrashBold } from "react-icons/pi";
import { deleteTest, type MyTestsEntry } from "../../api";
import ErrorModal from "../../components/ui/ErrorModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    isOpen: boolean,
    close: () => void,
    testName: string,
    testId: string,
    onSuccessfulTestDeletion?: () => void,
};

function DeleteTestModal({
    isOpen,
    close,
    testName,
    testId,
    onSuccessfulTestDeletion
}: Props) {
    const queryClient = useQueryClient();

    const deleteTestMutation = useMutation({
        mutationFn: (testId: string) => deleteTest(testId),
        onSuccess: async () => {
            queryClient.setQueryData<MyTestsEntry[]>(
                ["my-tests"],
                old => old?.filter(test => test.id !== testId)
            );
            onSuccessfulTestDeletion?.();
        }
    });
    
    return (
        <Modal
            isOpen={isOpen}
            close={close}
            className="delete-test-modal"
            title="Delete Test"
        >
            <span>Are you sure you want to delete the test <b>{testName}</b>?</span>
            <span>This action is irreversible!</span>
            <ErrorModal error={deleteTestMutation.error} />
            <Button
                className="my-tests-delete"
                onClick={() => deleteTestMutation.mutate(testId)}
                disabled={deleteTestMutation.isPending}
            ><PiTrashBold size={24}/>Yes</Button>
        </Modal>
    )
}

export default DeleteTestModal;