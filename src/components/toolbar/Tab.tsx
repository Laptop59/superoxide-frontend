import { useNavigate } from "react-router-dom";

type Props = {
    text: string,
    route?: string,
    onClick?: () => void
};

function Tab({
    text,
    route,
    onClick
}: Props) {
    const navigate = useNavigate();

    const defaultOnClick = () => {
        if (route)
            navigate(route);
    };

    return (
        <button className='toolbar-tab' onClick={() => {
            onClick?.();
            defaultOnClick();
        }}>{text}</button>
    );
}

export default Tab;