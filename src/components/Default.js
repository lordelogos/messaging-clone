import React from "react";
import "./Default.css";

function Default() {
	return (
		<div className="default">
			<div className="default__card">
				<div className="default__img" />
				<p className="default__title">Stay connected on the go</p>
				<p className="default__rules">
					Keep the rooms clean and friendly. Do not share private info as all
					groups are public and everyone can access your info
				</p>
				<div className="rule"></div>
				<p className="default__contact">
					The Creator,{" "}
					<a href="https://pauloe.me" target="_blank" rel="norefferer">
						Get in touch
					</a>
				</p>
			</div>
		</div>
	);
}

export default Default;