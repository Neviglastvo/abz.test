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
				<div className="header__logo">
					<Logo />
				</div>
				<div className="header__nav">
					<Nav />
				</div>
				<Hamburger open={open} setOpen={setOpen} />
			</div>
		</div>
	)
}

export default Header
