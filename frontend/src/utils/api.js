const USER_URL = import.meta.env.VITE_BACKEND_USER_URL


export const SignUpUser = async (userData) => {
    const response = await fetch(`${USER_URL}/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData),
        credentials: "include"
    });

    return response.json()
}

export const LoginUser = async (userData) => {
    const response = await fetch(`${USER_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData),
        credentials: "include"
    })

    return response.json()
}

export const checkAuth = async () => {
    const response = await fetch(`${USER_URL}/auth`, { credentials: "include" });

    if (!response.ok) {
        return null; // User is not authenticated
    }

    return response.json();
}


export const LogoutUser = async () => {
    const response = await fetch(`${USER_URL}/logout`, {
        method: "POST",
        credentials: "include"
    })
}