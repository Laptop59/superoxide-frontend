import "./Button.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
}

/**
 * Represents a generic button that can be displayed.
 * @param props The props to use for this button.
 * @returns The constructed button.
 */
function Button({
    children,
    ...props
}: Props) {
    return <button
        className='generic-button'
        {...props}
    >
        {children}
    </button>;
}

export default Button;