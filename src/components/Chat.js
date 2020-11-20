import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { useParams, Redirect } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import IconButton from "@material-ui/core/IconButton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import MoodIcon from "@material-ui/icons/Mood";
import { Input } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Messages from "./Messages";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import Moment from "moment";

function Chat() {
	let [{ user }] = useStateValue();
	let [emoji, setEmoji] = useState(false);
	let [options, setOptions] = useState(false);
	let [message, setMessage] = useState("");
	let [chats, setChats] = useState([]);
	let [roomName, setRoomName] = useState("");
	let [time, setTime] = useState(null);
	const optionRef = useRef(null);
	const roomId = useParams();

	let openToggle = () => {
		document.querySelector(".sidebar").classList.toggle("active");
	};

	let closeToggle = () => {
		let menu = document.querySelector(".sidebar");
		if (menu.classList.contains("active")) {
			menu.classList.remove("active");
		}
	};

	let deleteRoom = () => {
		db.collection("rooms")
			.doc(roomId.roomId)
			.onSnapshot((snapshot) =>
				// snapshot.docs.remove().then(console.log("removed"))
				snapshot.ref.delete().then(window.location.replace("/"))
			);
		// delete room logic
		setOptions(false);
	};

	useEffect(() => {
		if (roomId) {
			db.collection("rooms")
				.doc(roomId.roomId)
				.onSnapshot((snapshot) => {
					setRoomName(snapshot.data().name);
					setTime(snapshot.data().timestamp);
				});

			db.collection("rooms")
				.doc(roomId.roomId)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) => {
					setChats(snapshot.docs.map((doc) => doc.data()));
				});
		}
	}, [roomId]);

	let addChat = (e) => {
		e.preventDefault();
		if (message !== "" && message !== null) {
			db.collection("rooms").doc(roomId.roomId).collection("messages").add({
				name: user.displayName,
				message: message,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				id: user.uid,
			});
			setMessage("");
		}
	};

	let useOutsideAlerter = (ref) => {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setOptions(false);
				}
			}

			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	};

	useOutsideAlerter(optionRef);

	let addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		let newMsg = message + emoji;
		setMessage(newMsg);
	};

	return (
		<div className="chat">
			<div className="chat__nav">
				<IconButton onClick={openToggle}>
					<Avatar
						size="small"
						src={`https://avatars.dicebear.com/api/human/${roomId.roomId}.svg`}
					/>
				</IconButton>
				<div className="chat__title">
					<p>{roomName}</p>
					<p className="last__seen">
						{time
							? `Created at ${Moment(time.toDate()).format("h:mmA, DD/MM/YY")}`
							: ""}
					</p>
				</div>
				<IconButton
					disabled={user ? false : true}
					onClick={() => {
						setOptions(true);
					}}>
					<MoreVertRoundedIcon />
				</IconButton>
				{options ? (
					<div className="chat__options" ref={optionRef}>
						<p onClick={deleteRoom}>Delete Room</p>

						<p onClick={() => setOptions(false)}>
							<a
								href="https://github.com/lordelogos/messaging-clone/issues/new"
								target="_blank"
								rel="noreferrer">
								Request a Feature
							</a>
						</p>
					</div>
				) : (
					""
				)}
			</div>
			<div className="chat__box" onClick={closeToggle}>
				{chats.map((chat) => (
					<Messages
						sent={chat.id === user?.uid}
						name={chat.name}
						time={chat.timestamp}
						message={chat.message}
						key={chat.message + chat.timestamp}
					/>
				))}
			</div>
			<div className="chat__input">
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
				<form onSubmit={addChat}>
					<Input
						type="text"
						placeholder={user ? "Type a message" : "Sign in to send message"}
						disableUnderline={true}
						fullWidth={true}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						disabled={user ? false : true}
					/>
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

export default Chat;
