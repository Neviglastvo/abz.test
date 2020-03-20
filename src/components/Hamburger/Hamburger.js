import React from "react"
import "./hamburger.sass"

const Hamburger = props => {
	const { open, setOpen } = props

	const handleClick = () => {
		console.log("open", open)
		setOpen(!open)
	}

	return (
		<div className={`hamburger ${open ? "active" : ""}`} onClick={handleClick}>
			<div className="hamburger__icon"></div>
		</div>
	)
}

export default Hamburger
