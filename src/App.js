import "./App.css";
import React, { useEffect } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Default from "./components/Default";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./components/firebase";
import { useStateValue } from "./components/StateProvider";
import CreateUser from "./components/CreateUser";

function App() {
	const [{ user }, dispatch] = useStateValue();

	// let getFullScreen = () => {
	// 	return (
	// 		document.fullscreenElement ||
	// 		document.webkitFullscreenElement ||
	// 		document.mozFullscreenElement ||
	// 		document.msFullscreenElement
	// 	);
	// };

	// let toggleFullScreen = () => {
	// 	if (getFullScreen()) {
	// 		document.exitFullscreen();
	// 	} else {
	// 		document.documentElement.requestFullscreen().catch(console.log);
	// 	}
	// };

	// useEffect(() => {
	// 	document.addEventListener("dblclick", toggleFullScreen);
	// 	return () => {
	// 		document.removeEventListener("dblclick", toggleFullScreen);
	// 	};
	// }, []);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//logged in
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				//logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/create">
						<CreateUser />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/rooms/:roomId">
						<Sidebar />
						<Chat />
					</Route>
					<Route path="/">
						<Sidebar />
						<Default />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
