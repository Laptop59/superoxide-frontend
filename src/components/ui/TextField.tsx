import { forwardRef } from "react";

import "./TextField.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    header?: React.ReactNode,
    title: string
};

const TextField = forwardRef<
    HTMLInputElement,
    Props
>(
    ({title, header, ...props}: Props, ref) => {
        return (
            <div className='text-field'>
                <div className='text-field-header'>
                    <span>{title}</span>
                    {header}
                </div>
                
                <input
                    type='text'
                    className='text-field-input-box'
                    ref={ref}
                    spellCheck={false}
                    {...props}
                />                    
            </div>
        );
    }
);

export default TextField;