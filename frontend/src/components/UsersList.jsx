import { useState, useEffect } from "react" 
import { GetAllUsers } from "../utils/api"



const UsersList = () => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchUsers = async () => {

            try {
                const usersData = await GetAllUsers()
                
                setUsers(usersData)
            } catch (err) {
                setError(err.message)
            }

        }

        fetchUsers();
    }, [])

    return (
        <>

        <h2>All Users</h2>

        <ul>
            {users.map(user =>  (
                 <li key={user.id}>
                    User ID#{user.id}: @{user.username}
                 </li>

            ))}
           
        </ul>

        </>
    )

}

export default UsersList;