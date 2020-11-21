import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./CreateNewRoom.css";
import IconButton from "@material-ui/core/IconButton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { Picker } from "emoji-mart";
import { Input } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import MoodIcon from "@material-ui/icons/Mood";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import firebase from "firebase";
import { db } from "./firebase";

function CreateNewRoom() {
	let history = useHistory();
	let [{ user }] = useStateValue();
	let [emoji, setEmoji] = useState(false);
	let [chats, setChats] = useState([]);
	let [roomName, setRoomName] = useState("");
	let [char, setChar] = useState(25);

	let handleSubmit = () => {
		if (user) {
			let chatName = roomName;
			if (chatName !== "" && chatName !== null) {
				db.collection("rooms").add({
					name: chatName,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					created_by: user.uid,
				});
				history.push("/");
			}
		}
	};

	let handleChange = (e) => {
		setRoomName(e.target.value);
		handleCount();
	};

	let handleCount = () => {
		setChar(25 - roomName.length);
	};

	let addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		let newName = roomName + emoji;
		setRoomName(newName);
		handleCount();
	};

	return (
		<div className="createRoom">
			<div className="createRoom__board">
				<div>
					<Link to="/">
						<IconButton className="createRoom__btn">
							<ArrowBackIcon style={{ color: "white" }} />
						</IconButton>
					</Link>
					<h2>New Room</h2>
				</div>
			</div>
			<div className="createRoom__img"></div>
			<div className="createRoom__input">
				<IconButton
					disabled={user ? false : true}
					onClick={() => {
						setEmoji(!emoji);
					}}>
					{!emoji ? (
						<MoodIcon color="primary" />
					) : (
						<KeyboardIcon color="primary" />
					)}
				</IconButton>
				<form onSubmit={handleSubmit}>
					<div className="countedInput">
						<Input
							type="text"
							autoFocus={true}
							placeholder="Group name"
							disableUnderline={true}
							inputProps={{ maxLength: "25" }}
							fullWidth={true}
							value={roomName}
							onChange={handleChange}
							disabled={user ? false : true}
						/>
						<span>{char}</span>
					</div>
					<IconButton type="submit" disabled={user ? false : true}>
						<SendRoundedIcon color="primary" />
					</IconButton>
				</form>
			</div>
			<div style={emoji && user ? { display: "block" } : { display: "none" }}>
				<Picker
					style={{
						width: "100%",
					}}
					onSelect={(e) => addEmoji(e)}
				/>
			</div>
		</div>
	);
}

export default CreateNewRoom;
