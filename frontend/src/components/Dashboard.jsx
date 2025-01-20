import { LogoutUser } from "../utils/api";



const Dashboard = ({ user, setUser }) => {

    const handleLogout = async () =>  {
        try {
            await LogoutUser();
            setUser(null); // ✅ Clears user state, triggering a redirect to Login
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }
    
    return (
        <>
            {user ? (
            <h2>Welcome, {user?.username}!</h2>
            ) : (
            <h2>Welcome!</h2>    
            )}
            <button onClick={handleLogout}>Logout</button>
        </>
    )
    
}

export default Dashboard