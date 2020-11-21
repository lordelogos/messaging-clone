import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import "./AddNewChat.css";
import { useStateValue } from "./StateProvider";

function AddNewChat({ addNewChat, id, name, last }) {
	const [{ user }] = useStateValue();
	let [message, setMessage] = useState([]);

	useEffect(() => {
		if (id) {
			db.collection("rooms")
				.doc(id)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) =>
					setMessage(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [id]);

	let closeToggle = () => {
		let menu = document.querySelector(".sidebar");
		if (menu.classList.contains("active")) {
			menu.classList.remove("active");
		}
	};

	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className="addnewchat" onClick={closeToggle}>
				<Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
				<div className="addnewchat__details">
					<h3>{name}</h3>
					<p>{message[0] ? `${message[0].message}` : `No messages yet`}</p>
				</div>
			</div>
		</Link>
	) : (
		<Link to={user ? "/createRoom" : "/login"}>
			<div className="addnewchat fixed--bar">
				<h2>Add New Chat</h2>
			</div>
		</Link>
	);
}

export default AddNewChat;
