import React, { useState } from "react";
import "./Chat.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import IconButton from "@material-ui/core/IconButton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import MoodIcon from "@material-ui/icons/Mood";
import { Input } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import EmojiDis from "emoji-js";
import { Picker } from "emoji-mart";

function Chat() {
	let myemoji = new EmojiDis();
	myemoji.img_sets.apple.path = "http://my-cdn.com/emoji-apple-64/";
	myemoji.img_sets.apple.sheet = "http://my-cdn.com/emoji-apple-sheet-64.png";

	// Configure this library to use the sheets defined in `img_sets` (see above)
	myemoji.use_sheet = true;
	myemoji.replace_mode = "unified";
	myemoji.allow_native = true;

	let [emoji, setEmoji] = useState(false);
	let [message, setMessage] = useState("");

	let addEmoji = (e) => {
		console.log(e);
		let emoji = myemoji.replace_colons(e.colons);
		// let sym = e.unified.split("-");
		// let codesArray = [];
		// sym.forEach((el) => codesArray.push("0x" + el));
		// let emoji = String.fromCodePoint(...codesArray);
		let newMsg = message + emoji;
		setMessage(newMsg);
	};

	return (
		<div className="chat">
			<div className="chat__nav">
				<AccountCircleIcon />
				<p>Room name</p>
				<IconButton>
					<MoreVertRoundedIcon />
				</IconButton>
			</div>
			<div className="chat__box"></div>
			<div className="chat__input">
				<IconButton
					onClick={() => {
						setEmoji(!emoji);
					}}>
					<MoodIcon />
				</IconButton>
				<form>
					<Input
						type="text"
						placeholder="Type a message"
						disableUnderline={true}
						fullWidth={true}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<IconButton type="submit">
						<SendRoundedIcon />
					</IconButton>
				</form>
			</div>
			<div style={emoji ? { display: "block" } : { display: "none" }}>
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
