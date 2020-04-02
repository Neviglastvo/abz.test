import React from "react"
import { Link } from "react-scroll"
import "./logo.sass"

const Logo = props => {
	return (
		<Link
			className="logo"
			to={"top"}
			spy={false}
			smooth={true}
			duration={500}
			onClick={props.handleClick}
		>
			<img src="./img/logo.svg" alt="testtask" className="logo__icon" />
		</Link>
	)
}

export default Logo
