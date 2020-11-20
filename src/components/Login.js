import React, { useState } from "react";
import "./Login.css";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";

// https://avatars.dicebear.com/api/human/${seed}.svg

function Login() {
	let history = useHistory();
	let [{ user }] = useStateValue();
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let login = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				history.push("/");
			})
			.catch((e) => alert(e.message));
	};

	return (
		<div className="login">
			<div className="login__card">
				<h1>Login to Rooms</h1>
				<form className="login__form">
					<Input
						type="email"
						fullWidth={true}
						placeholder="Email"
						autoComplete="true"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						fullWidth={true}
						placeholder="Password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={login}>
						Sign In
					</Button>
					<p className="login__cta">
						Don't have an Account?{" "}
						<Link to="/create">
							<span>Create One</span>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
