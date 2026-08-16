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
    disabled: boolean,

    selected?: K | null,
    setSelected: (id: K | null) => void
};

function Choices<K extends React.Key>({
    title,
    header,
    choices,
    selected,
    setSelected,
    disabled,
    ...props
}: Props<K | null>) {
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
                            onClick={() => selected === choice.id ? setSelected(null) : setSelected(choice.id)}
                            disabled={disabled}
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