import "./ChoicesField.css";
import Button from "./Button";

type Choice<K> = {
    id: K,
    name: string
};

type Props<K> = React.InputHTMLAttributes<HTMLDivElement> & {
    header?: React.ReactNode,
    title: string,
    choices: Choice<K>[],

    selected?: K,
    setSelected: (id: K) => void
};

function Choices<K extends React.Key>({
    title,
    header,
    choices,
    selected,
    setSelected,
    ...props
}: Props<K>) {
    return (
        <div className='choices-field'>
            <div className='choices-field-header'>
                <span className='field-title'>{title}</span>
                {header}
            </div>
            
            <div
                className='choices-field-choices'
                {...props}
            >
                {
                    choices.map(choice => (
                        <Button
                            className={"choice" + (selected === choice.id ? " selected" : "")}
                            key={choice.id}
                            onClick={() => setSelected(choice.id)}
                        >
                            <span>{choice.name}</span>
                        </Button>
                    ))
                }
            </div>               
        </div>
    );
}

export default Choices;