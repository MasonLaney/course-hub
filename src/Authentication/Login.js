import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
	        event.preventDefault();
	        const { email, password } = event.target.elements;
	        try {
	            await app
	            .auth()
	            .signInWithEmailAndPassword(email.value, password.value);
	            history.push("/");
	        } catch (error) {
	            alert(error);
	        }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

	if (currentUser) {
        return <Redirect to="/" />;
	}

    return (
  	    <div className = "login">
	        <h1 className="titleText">Log in to sync classes with Sakai!</h1>
	        <p className="flavorText">(We don't store any of your info)</p>
	        <form onSubmit={handleLogin} className="inputText">
	            <label>
	                UNC Email:
		            <input name="email" type="email" placeholder="onyen@live.unc.edu" />
	            </label>
		        <p></p>
	            <label>
	                Password:
	                <input name="password" type="password" placeholder="password" />
	            </label>
	            <button type="submit" className="button">Log in</button>
	        </form>
  	    </div>
    );
};

export default withRouter(Login);
