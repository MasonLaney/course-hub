import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";

const SignUp = ({ history }) => {

	//happens when user clicks on submit
	const handleSignUp = useCallback(async event => {
		event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
	        .auth()
	        .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }

    //fetch http data

	}, [history]);

    return (
        <div className="login">
            <h1 className="titleText">Sign up for CourseHub!</h1>
	        <p className="flavorText">(The site for all your UNC schedule needs)</p>
            <form onSubmit={handleSignUp} className="inputText">
                <label>
                    UNC Email:
                    <input name="email" type="email" placeholder="onyen@live.unc.edu" />
                </label>
	            <p></p>
                <label>
                    Password:
                    <input name="password" type="password" placeholder="password" />
                </label>
                <button type="submit" className="button">Sign Up</button>
            </form>
        </div>
    );
};

export default withRouter(SignUp);
