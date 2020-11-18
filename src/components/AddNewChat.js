import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./AddNewChat.css";

function AddNewChat({ addNewChat }) {
	return !addNewChat ? (
		<div className="addnewchat">
			<AccountCircleIcon />
			<div className="addnewchat__details">
				<h2>Room name</h2>
				<p>Last message...</p>
			</div>
		</div>
	) : (
		<div className="addnewchat fixed--bar">
			<h1>Add New Chat</h1>
		</div>
	);
}

export default AddNewChat;
