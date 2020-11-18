import React from "react";
import "./Sidebar.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import AddNewChat from "./AddNewChat";
import EmojiDis from "emoji-js";

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar__nav">
				<AccountCircleIcon />
				{/* <p className="sidebar__name">Account Name</p> */}
				<Button variant="contained" size="small">
					Log Out
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
					/>
				</div>
			</div>
			<div className="sidebar__chat">
				<AddNewChat addNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
				<AddNewChat />
			</div>
		</div>
	);
}

export default Sidebar;
