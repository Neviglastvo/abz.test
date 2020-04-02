import Hamburger from "components/Hamburger/Hamburger"
import Logo from "components/Logo/Logo"
import Nav from "components/Nav/Nav"
import React from "react"
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
