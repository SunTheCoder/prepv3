import { useEffect, useState } from "react";
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import Dashboard from "../components/Dashboard";
import { checkAuth } from "../utils/api";



const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const verifyUser = async () => {
            const authUser = await checkAuth();
            console.log("Authenticated User:", authUser); // ✅ Debugging API response

            if (authUser) {
                setUser(authUser); // ✅ Only set if user is found
            }

            setLoading(false); // ✅ Prevents flashing of login
        };

        verifyUser();
    }, []);

    if (loading) return <h2>Loading...</h2>; // ✅

    return (
        <div>
            <h2>HOME</h2>
            <h2>Welcome, {user?.username}!</h2>
            
            <SignUp/>
            {user ? <Dashboard user={user} setUser={setUser} /> : <Login setUser={setUser} />} 
            {/* ✅ Pass setUser to Login */}
        </div>
    )
}

export default Home