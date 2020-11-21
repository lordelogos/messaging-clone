import "./App.css";
import React, { useState, useEffect } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Default from "./components/Default";
import CreateNewRoom from "./components/CreateNewRoom";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./components/firebase";
import { useStateValue } from "./components/StateProvider";
import CreateUser from "./components/CreateUser";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

function App() {
	const [{ user }, dispatch] = useStateValue();
	const [screenstate, setScreenstate] = useState(false);

	let getFullScreen = () => {
		return (
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullscreenElement ||
			document.msFullscreenElement
		);
	};

	let toggleFullScreen = () => {
		if (getFullScreen()) {
			document.exitFullscreen();
			setScreenstate(false);
		} else {
			document.documentElement
				.requestFullscreen()
				.then(() => setScreenstate(true))
				.catch(console.log);
		}
	};

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
			<div className="ctrl">
				{!screenstate ? (
					<FullscreenIcon onClick={toggleFullScreen} />
				) : (
					<FullscreenExitIcon onClick={toggleFullScreen} />
				)}
			</div>
			<Router>
				<Switch>
					<Route path="/create">
						<CreateUser />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/createRoom">
						<CreateNewRoom />
						<Default />
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
