import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import AddNewChat from "./AddNewChat";
import { auth, db } from "./firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Sidebar() {
	let history = useHistory();
	let [{ user }] = useStateValue();
	let [search, setSearch] = useState("");

	let [rooms, setRooms] = useState([]);

	useEffect(() => {
		const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
			setRooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
		return () => {
			unsubscribe();
		};
	}, []);

	let handleSignOut = () => {
		if (user) {
			auth.signOut();
		}
	};

	let gotoLogin = () => {
		history.push("/login");
	};
	return (
		<div className="sidebar active">
			<div className="sidebar__nav">
				{user ? (
					<Avatar
						src={`https://avatar.oxro.io/avatar.svg?name=${user?.displayName}&length=2`}
					/>
				) : (
					<Avatar src={`https://avatar.oxro.io/avatar.svg?name=G&length=1`} />
				)}
				<p className="sidebar__name">{user ? user.displayName : "Guest"}</p>
				<Button
					variant="contained"
					size="small"
					color="primary"
					onClick={user ? handleSignOut : gotoLogin}>
					{user ? "Logout" : "Login"}
				</Button>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchdiv">
					<SearchIcon />
					<Input
						type="text"
						placeholder="Search or start a new chat"
						disableUnderline={true}
						fullWidth={true}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
			<div className="sidebar__chat">
				<AddNewChat addNewChat />
				{search !== ""
					? rooms
							.filter((room) => room.data.name.includes(search))
							.map((room) => (
								<AddNewChat key={room.id} id={room.id} name={room.data.name} />
							))
					: rooms.map((room) => (
							<AddNewChat key={room.id} id={room.id} name={room.data.name} />
					  ))}
			</div>
		</div>
	);
}

export default Sidebar;
