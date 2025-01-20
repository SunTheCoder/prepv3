import { LogoutUser } from "../utils/api";



const Dashboard = ({ setUser }) => {

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
            
            <button onClick={handleLogout}>Logout</button>
        </>
    )
    
}

export default Dashboard