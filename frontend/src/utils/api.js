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
    const response = await fetch(`${USER_URL}/auth`, {
        method: "GET",
        headers:  {"Content-Type": "application/json"},
        credentials: "include" // ✅ Ensures cookies are sent

    });

    if (!response.ok) {
        return null; // User is not authenticated
    }

    const user = await response.json();
    console.log("Received User:", user); // ✅ Debugging response

    return user || null; // ✅ Ensures a valid object is returned
}

//GET ALL USERS FUNC & THEN COMPONENT TO BE IN PROFILE FOR MAP PRACTICE

export const GetAllUsers = async () => {
    try {
        const response = await fetch(`${USER_URL}/`, { 
            method: "GET",
            headers: { "Content-Type": "application/json" }, 
            credentials: "include"
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // ✅ Get response text for better debugging
            throw new Error(`Failed to fetch users: ${response.status} - ${errorMessage}`);
        }

        return await response.json(); // ✅ Ensure JSON parsing is safe

    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error; // ✅ Re-throw error for better handling in components
    }
};


export const UpdateUser = async (userData) => {
    const response = await fetch(`${USER_URL}/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
    }


    return response.json()
}


export const LogoutUser = async () => {
    const response = await fetch(`${USER_URL}/logout`, {
        method: "POST",
        credentials: "include"
    })
}