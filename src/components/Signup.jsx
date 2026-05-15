import { useState } from "react";
import axios from "axios";

function Signup({ setIsLoggedIn, setShowSignup }) {

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");



    const handleSignup = async () => {

        try {

            const response = await axios.post(
                "https://taskflow-backend-6dj3.onrender.com/signup",
                {
                    username,
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            setMessage("Signup Successful");

            setIsLoggedIn(true);

        }

        catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Signup Failed"
            );

        }

    };



    return (

        <div className="todo-container">

            <h1 className="title">
                Signup
            </h1>

            <div className="auth-form">

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    className="todo-input"
                />

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
                    onClick={handleSignup}
                    className="add-btn"
                >
                    Signup
                </button>

                {
                    message && (
                        <p className="auth-message">
                            {message}
                        </p>
                    )
                }

                <p className="switch-auth">

                    Already have an account?

                    <span
                        onClick={() =>
                            setShowSignup(false)
                        }
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>

    );

}

export default Signup;