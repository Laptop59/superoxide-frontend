const API_URL = "http://localhost:8080";

class ApiError extends Error {
    request_type: string;
    status_code: number;
    body: any;

    constructor(request_type: string, status_code: number, body: any) {
        super(`${request_type} request failed with a status code of ${status_code}`);

        this.request_type = request_type;
        this.status_code = status_code;
        this.body = body;
    }
}

type UsernameAvailability =
    { status: "available" } |
    { status: "already_taken" } |
    { status: "invalid", reason: "too_short" | "too_long" | "invalid_characters" | "contains_spaces" };

async function fetchUsernameAvailability(username: string): Promise<UsernameAvailability> {
    const response = await fetch(`${API_URL}/accounts/username-availability?username=${encodeURIComponent(username)}`);

    let json: any = "Invalid JSON was sent by the server";
    try {
        json = await response.json();
    } catch(e) {}

    if (response.ok) {
        return json as UsernameAvailability;
    } else {
        throw new ApiError("GET", response.status, json);
    }
}

export type {
    UsernameAvailability
};

export {
    fetchUsernameAvailability
};