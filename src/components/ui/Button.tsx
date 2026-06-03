import { forwardRef } from "react";
import "./Button.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
}

/**
 * Represents a generic button that can be displayed.
 * @param props The props to use for this button.
 * @returns The constructed button.
 */
const Button = forwardRef<
    HTMLButtonElement,
    Props
>(
    ({children, ...props}: Props, ref) => (
        <button
            {...props}
            className={'generic-button ' + props.className}
            ref={ref}
        >
            {children}
        </button>
    )
);

export default Button;