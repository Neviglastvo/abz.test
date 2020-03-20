import Logo from "components/Logo/Logo"
import Nav from "components/Nav/Nav"
import useOutsideClick from "hooks/useOutsideClick"

import React, { useRef } from "react"
import "./navMobile.sass"

const NavMobile = props => {
	const { open, setOpen } = props

	const handleClick = () => {
		setOpen(!open)
	}

	const ref = useRef()

	useOutsideClick(ref, () => {
		open && setOpen(!open)
	})

	return (
		<div className={`navMobile ${open ? "active" : ""}`}>
			<div className="navMobile__menu" ref={ref}>
				<div className="navMobile__logo">
					<Logo />
				</div>
				<div className="navMobile__item">
					<Nav handleClick={handleClick} />
				</div>
			</div>
			<div className="navMobile__bg" onClick={handleClick}></div>
		</div>
	)
}

export default NavMobile
