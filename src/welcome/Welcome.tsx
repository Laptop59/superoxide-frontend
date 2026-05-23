import { useRef, useState } from 'react';
import './Welcome.css';

import errorIcon from '../assets/error_icon.svg';
import Button from '../ui/Button';

const WelcomeComponents = {
    empty: Empty,
    register: Register,
    login: Login
} as const;

type WelcomeState = keyof typeof WelcomeComponents;

type WelcomeProps = {
    setState: (state: WelcomeState) => void
};

function Welcome() {
    let [state, setState] = useState<WelcomeState>("empty");

    const WelcomeComponent = WelcomeComponents[state];

    return (
        <>
            <div className='welcome'>
                <h1>Welcome! We're so excited to see you here!</h1>
                <h3>All you need to do is to get into an account!</h3>
                <div className='welcome-box'>
                    <WelcomeComponent setState={setState} />
                </div>
            </div>
        </>
    )
}

function Empty({ setState }: WelcomeProps) {
    return (
        <>
            <h3>Choose a method:</h3>
            <div className='welcome-choices'>
                <Button onClick={() => setState("register")}>Register</Button>
                <Button onClick={() => setState("login")}>Login</Button>
            </div>
        </>
    );
}

function Register({ setState }: WelcomeProps) {
    let [error, setError] = useState<string | null>(null);

    let [showPassword, setShowPassword] = useState<boolean>(false);
    let [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className='welcome-back'>
                <Button onClick={() => setState("empty")}>← Go Back</Button>
            </div>
            <div className='welcome-inner-box'>
                <h3>Let's create an account!</h3>
                {
                    error && <div className='welcome-error'>
                        <img src={errorIcon} />
                        <span>{error}</span>
                    </div>
                }
                <div className='welcome-field'>
                    <span>Username</span>
                    <div className='welcome-input-box-group'>
                        <input
                            placeholder="Enter your desired username..."
                            type='text'
                            className='welcome-input-box'
                            ref={usernameRef}
                        />
                    </div>
                </div>
                <div className='welcome-field'>
                    <span>Password</span>
                    <div className='welcome-input-box-group'>
                        <input
                            placeholder="Enter the password you want to use..."
                            type={showPassword ? 'text' : 'password'}
                            className='welcome-input-box'
                            ref={passwordRef}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className='welcome-password-visiblity'
                        >
                            {showPassword ? 'HIDE' : 'SHOW'}
                        </button>
                    </div>
                </div>
                <div className='welcome-field'>
                    <span>Confirm Password</span>
                    <div className='welcome-input-box-group'>
                        <input
                            placeholder="Confirm your password..."
                            type={showConfirmPassword ? 'text' : 'password'}
                            className='welcome-input-box'
                            ref={confirmPasswordRef}
                        />
                        <button
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className='welcome-password-visiblity'
                        >
                            {showConfirmPassword ? 'HIDE' : 'SHOW'}
                        </button>
                    </div>
                </div>
                <Button onClick={onRegisterClick}>Create Account</Button>
            </div>
        </>
    );

    function onRegisterClick() {
        try {
            register();
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(String(e));
            }
        }
    }

    function register() {
        const username = usernameRef.current?.value.trim();
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!username) {
            throw Error("Please enter a username.");
        }
        if (!password) {
            throw Error("Please enter a password.");
        }
        if (password !== confirmPassword) {
            throw Error("Passwords do not match.");
        }
        // TODO
    }
}

function Login({ setState }: WelcomeProps) {
    return (
        <>
            <div className='welcome-back'>
                <Button onClick={() => setState("empty")}>← Go Back</Button>
            </div>
            <div className='welcome-inner-box'>
                <h3>Welcome back! Let's sign in your account!</h3>
                <div className='welcome-field'>
                    <span>Username</span>
                    <input type='text' className='welcome-input-box'></input>
                </div>
                <div className='welcome-field'>
                    <span>Password</span>
                    <input type='password' className='welcome-input-box'></input>
                </div>
                <Button onClick={() => { }}>Sign In</Button>
            </div>
        </>
    );
}

export default Welcome;