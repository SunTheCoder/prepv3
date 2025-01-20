import { useEffect, useState } from "react";
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import Dashboard from "../components/Dashboard";
import { checkAuth } from "../utils/api";



const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const veryifyUser = async () => {

            const authUser = await checkAuth();
            setUser(authUser);
        }

        veryifyUser()
    }, [])


    return (
        <>
            <h2>HOME</h2>
            
            <SignUp/>
            {user ? <Dashboard user={user} setUser={setUser} /> : <Login setUser={setUser} />} 
            {/* ✅ Pass setUser to Login */}
        </>
    )
}

export default Home