import React from "react"

import Hamburger from "../Hamburger/Hamburger"
import Nav from "../Nav/Nav"
import Logo from "../Logo/Logo"
import "./header.sass"

const Header = props => {
	const { open, setOpen } = props
	return (
		<div className="header">
			<div className="header__container">
				<Logo />
				<Nav />
				<Hamburger open={open} setOpen={setOpen} />
			</div>
		</div>
	)
}

export default Header
