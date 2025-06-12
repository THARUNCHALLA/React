import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider'

const Login = () => {
    const [user, setUser] = useState("")
    const navigate = useNavigate()
    const { login } = useAuth()
    const Handlelogin = () => {
        if (user.trim()) {
            login(user)
            navigate("/", { replace: true })
        }
    }
    return (
        <div>
            <p>User Details</p>
            <input type="text" placeholder='Enter User Name' onChange={(e) => setUser(e.target.value)} value={user} />
            <button onClick={Handlelogin}>submit</button>
        </div>
    )
}

export default Login
