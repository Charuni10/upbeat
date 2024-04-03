import { useState } from "react";
import './login.css';
import login from '../static/login.png';
import signup from '../static/signup.png';
import { useNavigate } from "react-router";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const clickSignUp = () => {
        setIsSignUp(true);
    };

    const clickSignIn = () => {
        setIsSignUp(false);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://13.233.127.190:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json(); // Parse the response body as JSON
                const token = data.access_token; // Assuming the response includes a 'token' field
                console.log("token",token)
                // Store the token in localStorage or sessionStorage for future use
                localStorage.setItem("token", token);
                navigate("/home");
            } else {
                alert("Invalid email or password");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const validateSignUp = () => {
        // Validate username
        if (username.length < 3) {
            alert("Username must be at least 3 characters long");
            return false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email address");
            return false;
        }
        
        // Validate phone number
        if (!phoneNumber.match(/^\d{10}$/)) {
            alert("Phone number must be 10 digits long");
            return false;
        }
        
        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Password must be strong with at least one uppercase letter, one lowercase letter, one number, and one special character");
            return false;
        }
        
        return true;
    };

    const handleSignUp = async () => {
        if (!validateSignUp()) {
            return;
        }

        try {
            const response = await fetch("http://13.233.127.190:8080/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, phone_number: phoneNumber, password }),
            });
            if (response.ok) {
                navigate("/profile");
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-in-form">
                        <h2 className="title">Sign In</h2>
                        <div className="input-field">
                            <AiOutlineUser className="icons"/>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                        </div>
                        <div className="input-field">
                            <RiLockPasswordLine className="icons"/>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                        <input type="button" onClick={handleLogin} value="Login" className="btn"/>
                    </form>

                    <form className="sign-up-form">
                        <h2 className="title">Sign Up</h2>
                        <div className="input-field">
                            <AiOutlineUser className="icons"/>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                        </div>
                        <div className="input-field">
                            <AiOutlineMail className="icons"/>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                        </div>
                        <div className="input-field">
                            <AiOutlinePhone className="icons"/>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                        </div>
                        <div className="input-field">
                            <RiLockPasswordLine className="icons"/>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                        <input type="button" onClick={handleSignUp} value="Signup" className="btn"/>
                    </form>
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>Feeling down? Need a mood lift? UPBEAT's your friendly cheerleader.</p>
                        <button className="btn transparent" id="sign-up-btn" onClick={clickSignUp}>Sign Up</button>
                    </div>
                    <img className="image" src={signup} alt=""/>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Not a new face here?</h3>
                        <p>Back again? Let's keep those happy vibes going!!</p>
                        <button className="btn transparent" id="sign-in-btn" onClick={clickSignIn}>Sign In</button>
                    </div>
                    <img className="image" src={login} alt=""/>
                </div>
            </div>
        </div>
    );
}
