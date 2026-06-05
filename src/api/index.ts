const API_URL = "api";

/// Used for errors usually.
const ERRORED_STATUS_MAP: Record<string, string> = {
    username_already_taken: "The provided username is already taken.",
    invalid_username: "The provided username is invalid.",
    too_many_requests: "Please wait a moment before trying again.",
    incorrect_username_or_password: "Incorrect username or password.",
    not_found: "The resource requested was not found.",
    unauthorized: "You are not authorized to perform this action.",
};

class ApiError extends Error {
    status_code: number;
    body: unknown;

    constructor(status_code: number, body: unknown) {
        let errorString = `Request failed with a status code of ${status_code}`;

        if (typeof body === "object" && body && "status" in body) {
            const key = body.status;
            if (typeof key === "string" && key in ERRORED_STATUS_MAP) {
                errorString = ERRORED_STATUS_MAP[key];
            }
        }

        super(errorString);

        this.status_code = status_code;
        this.body = body;
    }
}

type UsernameAvailability =
    { status: "available" } |
    { status: "already_taken" } |
    { status: "could_not_ask_server" } |
    { status: "invalid", reason: "too_short" | "too_long" | "invalid_characters" | "contains_spaces" };

interface UserDetails {
    username: string
}

async function makeApiRequest(input: RequestInfo | URL, init?: RequestInit): Promise<unknown> {
    const response = await fetch(input, init);

    let json: unknown = {status: "server_sent_invalid_json"};
    try {
        json = await response.json();
    } catch {
        // Do nothing
    }

    if (response.ok) {
        return json;
    } else {
        throw new ApiError(response.status, json);
    }
}

async function fetchUsernameAvailability(username: string): Promise<UsernameAvailability> {
    return await makeApiRequest(`${API_URL}/accounts/username-availability?username=${encodeURIComponent(username)}`) as UsernameAvailability;
}

async function registerAccount(username: string, password: string): Promise<UserDetails> {
    const json = await makeApiRequest(`${API_URL}/accounts/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    }) as {user: UserDetails};

    return json.user as UserDetails;
}

async function loginAccount(username: string, password: string): Promise<UserDetails> {
    const json = await makeApiRequest(`${API_URL}/accounts/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    }) as {user: UserDetails};

    return json.user as UserDetails;
}

async function signOutAccount(): Promise<void> {
    await makeApiRequest(`${API_URL}/accounts/sign-out`, {
        method: "DELETE"
    });
}

async function me(): Promise<UserDetails> {
    return await makeApiRequest(`${API_URL}/me`, {
        credentials: "include"
    }) as UserDetails;
}

export type {
    UsernameAvailability,
    UserDetails
};

export {
    ApiError,
    fetchUsernameAvailability,
    registerAccount,
    loginAccount,
    signOutAccount,
    me
};