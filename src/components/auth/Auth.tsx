import { useRef, useState } from 'react';
import './Welcome.css';

import Button from '../../components/ui/Button';
import { PasswordField } from '../../components/ui';
import TextField from '../../components/ui/TextField';
import { fetchUsernameAvailability, loginAccount, registerAccount, type UsernameAvailability } from '../../api';
import Requirements from '../../components/requirements';
import ErrorModal from '../../components/ui/ErrorModal';

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
            <div className='auth'>
                <h1>Welcome! We're so excited to see you here!</h1>
                <h3>All you need to do is to get into an account!</h3>
                <div className='auth-box'>
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
            <div className='auth-choices'>
                <Button onClick={() => setState("register")}>Register</Button>
                <Button onClick={() => setState("login")}>Login</Button>
            </div>
        </>
    );
}

function Register({ setState }: WelcomeProps) {
    let [error, setError] = useState<unknown>(null);

    const usernameRef = useRef<HTMLInputElement>(null);

    const [usernameAvailability, setUsernameAvailability] = useState<UsernameAvailability | null>();

    const [password, setPassword] = useState<string>("");
    const [passwordAllowed, setPasswordAllowed] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    return (
        <>
            <div className='auth-back'>
                <Button onClick={() => setState("empty")}>← Go Back</Button>
            </div>
            <div className='auth-inner-box'>
                <h3>Let's create an account!</h3>
                <ErrorModal error={error}/>
                <TextField
                    title="Username"
                    placeholder="user123"
                    ref={usernameRef}
                    header={usernameAvailability && renderUsernameAvailability(usernameAvailability)}

                    // When defocused
                    onBlur={async e => {
                        setUsernameAvailability(null);
                        const username = e.target.value;
                        if (username)
                            try {
                                const response = await fetchUsernameAvailability(e.target.value);
                                setUsernameAvailability(response);
                            } catch(e) {
                                console.error("Could not determine username availability:", e);
                                setUsernameAvailability({ status: "could_not_ask_server" });
                            }
                    }}

                    onChange={() => setUsernameAvailability(null)}
                />
                <PasswordField
                    title="Password"
                    placeholder="Create a strong password..."
                    onChange={e => setPassword(e.target.value)}
                    maxLength={256}
                />
                <Requirements
                    title="Your password must:"
                    state={password}
                    requirements={[
                        {
                            text: "be at least 12 characters long.",
                            criterion: password => password.length >= 12
                        }
                    ]}
                    onRequirementChange={setPasswordAllowed}
                />
                <Button
                    onClick={() => onRegisterClick(usernameAvailability, passwordAllowed)}
                    disabled={submitting}
                >Create Account</Button>
            </div>
        </>
    );

    async function onRegisterClick(usernameAvailability: UsernameAvailability | null | undefined, passwordAllowed: boolean) {
        setSubmitting(true);
        try {
            setError(null);
            await register(usernameAvailability, passwordAllowed);
        } catch (e) {
            setError(e);
        } finally {
            setSubmitting(false);
        }
    }

    async function register(usernameAvailability: UsernameAvailability | null | undefined, passwordAllowed: boolean) {
        const username = usernameRef.current?.value.trim();

        if (!username) {
            throw Error("Please enter a username.");
        }

        if (usernameAvailability?.status != "available")
            throw Error("Please check your username status.");

        if (!password) {
            throw Error("Please enter a password.");
        }

        if (!passwordAllowed) {
            throw Error("Your password must satisfy all the given requirements for it.");
        }

        await registerAccount(username, password);
        alert("Nice job!");
    }

    function renderUsernameAvailability(availability: UsernameAvailability) {
        const isPositive = availability.status == "available";
        const className = `auth-username-availability-${isPositive ? "positive" : "negative"}`;

        let text = "";

        switch (availability.status) {
            case "available":
                text = "Username is available";
                break;

            case "already_taken":
                text = "Username is already taken";
                break;

            case "could_not_ask_server":
                text = "Server cannot be reached to verify";
                break;

            case "invalid":
                switch (availability.reason) {
                    case "too_short":
                        text = "Username is too short";
                        break;

                    case "too_long":
                        text = "Username is too long";
                        break;

                    case "contains_spaces":
                        text = "Username cannot contain spaces";
                        break;

                    case "invalid_characters":
                        text = "Username contains invalid characters";
                        break;
                }
                break;
        }

        return <span className={className}>{text}</span>;
    }
}

function Login({ setState }: WelcomeProps) {
    let [error, setError] = useState<unknown>(null);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    
    return (
        <>
            <div className='auth-back'>
                <Button onClick={() => setState("empty")}>← Go Back</Button>
            </div>
            <div className='auth-inner-box'>
                <h3>Welcome back! Let's sign in your account!</h3>
                <ErrorModal error={error}/>
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
                <Button
                    onClick={onLoginClick}
                    disabled={submitting}
                >Login</Button>
            </div>
        </>
    );

    async function onLoginClick() {
        setSubmitting(true);
        try {
            setError(null);
            await login();
        } catch (e) {
            setError(e);
        } finally {
            setSubmitting(false);
        }
    }

    async function login() {
        const username = usernameRef.current?.value.trim();
        const password = passwordRef.current?.value.trim();

        if (!username) {
            throw Error("Please enter a username.");
        }

        if (!password) {
            throw Error("Please enter a password.");
        }

        await loginAccount(username, password);
        alert("Nice job!");
    }
}

export default Welcome;