import React from "react";
import "./Messages.css";
import * as Moment from "moment";
import { Twemoji } from "react-emoji-render";

function Messages({ sent, name, message, time }) {
	// let sent = false;
	return (
		<div className={!sent ? "recieved__chat" : "sent__chat"}>
			<span className={!sent ? "recieved__sender" : "sent__sender"}>
				{name}
			</span>
			<Twemoji text={message} className="twemoji" />
			<span className="recieved__time">
				{/* {new Date(time.toDate()).toUTCString()} */}
				{Moment(time?.toDate()).format("DD/MM/YY, h:mmA")}
			</span>
		</div>
	);
}

export default Messages;
