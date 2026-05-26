import { forwardRef } from "react";

import "./TextField.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    title: string
};

const TextField = forwardRef<
    HTMLInputElement,
    Props
>(
    ({title, ...props}: Props, ref) => {
        return (
            <div className='text-field'>
                <span>{title}</span>
                
                <input
                    type='text'
                    className='text-field-input-box'
                    ref={ref}
                    {...props}
                />                    
            </div>
        );
    }
);

export default TextField;