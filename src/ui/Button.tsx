import type { MouseEventHandler } from "react";

type ButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode
}

/**
 * Represents a generic button that can be displayed.
 * @param props The props to use for this button.
 * @returns The constructed button.
 */
function Button({
    onClick,
    children
}: ButtonProps) {
    return <button
        onClick={onClick}
        className='generic-button'
    >
        {children}
    </button>;
}

export default Button;