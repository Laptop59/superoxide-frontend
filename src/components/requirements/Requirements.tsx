import "./Requirements.css";

import satisfiedImage from "./satisfied.svg";
import unsatisfiedImage from "./unsatisfied.svg";
import { useEffect } from "react";

type Requirement<S> = {
    text: string,
    criterion: (state: S) => boolean
};

type Props<S> = {
    title?: string,
    state: S
    requirements: Requirement<S>[]
    onRequirementChange: (satisfied: boolean) => void
};

function Requirement<S>({
    title,
    state,
    requirements,
    onRequirementChange
}:  Props<S>) {
    const satisfied = requirements.every(requirement => requirement.criterion(state));
    useEffect(() => onRequirementChange(satisfied), [satisfied]);

    return <div className="requirements">
        {
            title && <h3>{title}</h3>
        }
        {
            requirements.map((requirement, i) => {
                const isSatisfied = requirement.criterion(state);
                const image = isSatisfied ? satisfiedImage : unsatisfiedImage;

                return <div
                    key={i} className={`requirements-requirement${isSatisfied ? " requirements-satisfied" : ""}`}
                    >
                    <img src={image} />
                    <span>{requirement.text}</span>
                </div>;
            })
        }
    </div>
}

export default Requirement;