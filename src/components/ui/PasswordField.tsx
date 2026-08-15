import { forwardRef, useState } from "react";

import "./PasswordField.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    title: string
};

const PasswordField = forwardRef<
    HTMLInputElement,
    Props
>(
    ({title, ...props}: Props, ref) => {
        const [showPassword, setShowPassword] = useState<boolean>(false);
        
        return (
            <div className='password-field'>
                <div className='password-field-header'>
                    <span className='field-title'>{title}</span>
                    <div>
                        <span>Show Password</span>
                        <input
                            type='checkbox'
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                    </div>
                </div>
                
                <input
                    type={showPassword ? 'text' : 'password'}
                    className='password-field-input-box'
                    ref={ref}
                    {...props}
                />                    
            </div>
        );
    }
);

export default PasswordField;