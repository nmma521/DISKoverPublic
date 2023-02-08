import React, { useState } from "react";
import "./SignUpForm.css";
import { useAuth } from "../../context/AuthContext";
import { WEB_APP } from "../../constants/routes";
import { useHistory } from "react-router-dom";


const SignUpForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    const auth = useAuth();

    return (
        <div className="container">
            <form 
            onSubmit={(event) => {
                event.preventDefault()
                auth.signup({email, password, callback: () => history.push(WEB_APP)})
                /*
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
                */
                setEmail("");
                setPassword("")
            }}
            >
                <label>Email</label>
                <input 
                type="email" 
                value={email}
                onChange = {(event) => setEmail(event.target.value)}
                />
                <label>Password</label>
                <input 
                type="password" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>

        </div>
    )
}

export default SignUpForm;