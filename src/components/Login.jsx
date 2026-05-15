import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, setShowSignup }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "https://taskflow-backend-6dj3.onrender.com/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            setMessage("Login Successful");

            setIsLoggedIn(true);

        }

        catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="todo-container">

            <h1 className="title">
                Login
            </h1>

            <div className="auth-form">

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="todo-input"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="todo-input"
                />

                <button
                    onClick={handleLogin}
                    className="add-btn"
                >
                    Login
                </button>

                {
                    message && (
                        <p className="auth-message">
                            {message}
                        </p>
                    )
                }

                <p className="switch-auth">
                    New User?
                    <span
                        onClick={() =>
                            setShowSignup(true)
                        }
                    >
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;