import { useState } from "react"
import { SignUpUser } from "../utils/api"


const SignUp = () => {
    const [form, setForm] = useState({ name: "", username: "", email: "", password: ""})
    const [meesage, setMessage] = useState("")

    const handleChange = (e) => {
        setForm( ...form, {[e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await SignUpUser(form)

            if (data.error) {
                setMessage("Sign up failed.")
            } else {
                setMessage("Sign up succeeded.")
            }
        } catch (error) {
            console.error("")
        }
        
    }
    return (
        <>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="username"
                    type="text"
                    placeholder="Enter a username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Enter your email."
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Enter a password."
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <p>{meesage}</p>
        </>
    )
}

export default SignUp