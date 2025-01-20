import { useState } from "react"
import { LoginUser } from "../utils/api"


const Login = ({ setUser }) => {
    const [form, setForm] = useState({ username: "", password: ""})
    const [message, setMessage] = useState("")


    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await LoginUser(form)
            
            if (data.error) {
                setMessage("Login failed " + data.error)
            } else {
                setUser(data);
                setMessage("Login Successful")
            }

        } catch (error) {
            console.error("Login Failed: ", error)
        }

    }

    return (
        <>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input 
                    name="username"
                    type="text"
                    value={form.username}
                    placeholder="username"
                    onChange={handleChange}
                    required
                />
                <input 
                    name="password"
                    type="password"
                    value={form.password}
                    placeholder="password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>

            </form>
            
            <p>{message}</p>
        </>
    )
}

export default Login