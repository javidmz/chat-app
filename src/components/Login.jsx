import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../style/Login.scss"

const Login = () => {
    const { isLoggedIn, setIsLoggedIn, setUserInfo } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('helloo');
        const user = {
            username, 
            password
        };

        fetch('http://localhost:8082/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => 
            console.log('Error is happened!')
        )
        setIsLoggedIn(true);
        // setUserInfo(username);
        console.log('helloo');
        navigate('/')
    }
    console.log(isLoggedIn);
    return(
        <form className="login-form" onSubmit={handleLogin}>
            <div>Sign in</div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign in</button>
        </form>
    )
}

export default Login;