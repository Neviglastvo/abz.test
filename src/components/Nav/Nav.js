import React from "react"
import "./nav.sass"

const Nav = props => {
	const items = [
		{ text: "About me", link: "#register" },
		{ text: "Relationships", link: "#register" },
		{ text: "Requirements", link: "#register" },
		{ text: "Users", link: "#register" },
		{ text: "Sign Up", link: "#register" },
	]

	return (
		<nav className="nav">
			{items.map(item => (
				<a
					href={item.link}
					className="nav__item"
					onClick={props.handleClick}
					key={item.text}
				>
					{item.text}
				</a>
			))}
		</nav>
	)
}

export default Nav
