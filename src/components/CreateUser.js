import "./Login.css";
import React, { useState } from "react";
import "./Login.css";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

// https://avatars.dicebear.com/api/human/${seed}.svg

function Login() {
	let history = useHistory();
	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let register = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				const user = auth.currentUser;
				history.push("/");
				return user.updateProfile({
					displayName: name,
				});
			})
			.catch((e) => alert(e.message));
	};

	return (
		<div className="login">
			<div className="login__card">
				<h1>Create Account</h1>
				<form className="login__form">
					<Input
						type="text"
						fullWidth={true}
						placeholder="Username"
						required
						onChange={(e) => setName(e.target.value)}
						autoFocus={true}
					/>
					<Input
						type="email"
						fullWidth={true}
						placeholder="Email"
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
						onClick={register}>
						Create Account
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Login;
