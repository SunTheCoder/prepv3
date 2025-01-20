import { LogoutUser } from "../utils/api";



const Dashboard = () => {

    function handleLogout() {
        LogoutUser().then(() => window.location.reload());
    }
    
    return (
    <button onClick={handleLogout}>Logout</button>
    )
    
}

export default Dashboard