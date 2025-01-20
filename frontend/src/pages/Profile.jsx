import { useState } from "react";
import { UpdateUser } from "../utils/api";
import { useUserContext } from "../context/UserContext";
import { handleInputChange } from "../utils/formHelper";

const Profile = () => {
    const { user, setUser } = useUserContext();
    const [form, setForm] = useState({
        name: user?.name || "",
        username: user?.username || "",
        bio: user?.bio || ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await UpdateUser({ ...form, id: user.id }); // ✅ Include user ID
            setUser(updatedUser.user); // ✅ Update context with new user data
            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage(`Update failed: ${error.message}`);
        }
    };

    return (
        <>  

            <h2>{user?.username}'s Profile</h2>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Bio: {user?.bio}</p>
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    value={form.name}
                    placeholder="Name"
                    onChange={handleChange}
                    
                />
                <input
                    name="username"
                    type="text"
                    value={form.username}
                    placeholder="Username"
                    onChange={handleChange}
                    
                />
                <textarea
                    name="bio"
                    value={form.bio}
                    placeholder="Bio"
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
            <p>{message}</p>
        </>
    );
};

export default Profile;


