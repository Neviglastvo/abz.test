import React from "react"
import { Link } from "react-scroll"
import "./nav.sass"

const Nav = props => {
	const items = [
		{ text: "About me", link: "register" },
		{ text: "Relationships", link: "register" },
		{ text: "Requirements", link: "register" },
		{ text: "Users", link: "register" },
		{ text: "Sign Up", link: "register" },
	]

	return (
		<nav className="nav">
			{items.map(item => (
				<Link
					key={item.text}
					className="nav__item"
					to={item.link}
					spy={false}
					smooth={true}
					duration={500}
					onClick={props.handleClick}
				>
					{item.text}
				</Link>
			))}
		</nav>
	)
}

export default Nav
