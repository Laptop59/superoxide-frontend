import { useParams } from "react-router-dom";
import "./EditTest.css";

type EditTestParams = { testId: string };

function EditTest() {
    const { testId } = useParams<EditTestParams>();

    return <div className="edit-test">
        <div className="edit-test-header">Editing Test {testId}</div>
    </div>;
}

export default EditTest;