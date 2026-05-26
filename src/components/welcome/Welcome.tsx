import { useRef, useState } from 'react';
import './Welcome.css';

import errorIcon from '../../assets/error_icon.svg';
import Button from '../ui/Button';
import { PasswordField } from '../ui';
import TextField from '../ui/TextField';

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

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

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
                <TextField
                    title="Username"
                    placeholder="user123"
                    ref={usernameRef}
                />
                <PasswordField
                    title="Password"
                    placeholder="Create a strong password..."
                    ref={passwordRef}
                />
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

        if (!username) {
            throw Error("Please enter a username.");
        }
        if (!password) {
            throw Error("Please enter a password.");
        }
        // TODO
    }
}

function Login({ setState }: WelcomeProps) {
    let [error, setError] = useState<string | null>(null);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    return (
        <>
            <div className='welcome-back'>
                <Button onClick={() => setState("empty")}>← Go Back</Button>
            </div>
            <div className='welcome-inner-box'>
                <h3>Welcome back! Let's sign in your account!</h3>
                <TextField
                    title="Username"
                    placeholder="user123"
                    ref={usernameRef}
                />
                <PasswordField
                    title="Password"
                    placeholder="Create a strong password..."
                    ref={passwordRef}
                />
                <Button onClick={() => { }}>Sign In</Button>
            </div>
        </>
    );
}

export default Welcome;