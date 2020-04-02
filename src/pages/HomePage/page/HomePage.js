import Acquainted from "pages/HomePage/blocks/Acquainted/Acquainted"
import Form from "pages/HomePage/blocks/Form/Form"
import Hero from "pages/HomePage/blocks/Hero/Hero"
import Users from "pages/HomePage/blocks/Users/Users/Users"
import React, { useEffect, useState } from "react"
import "./homePage.sass"

const HomePage = () => {
	const [userCreated, setUserCreated] = useState(false)

	useEffect(() => {
		console.log("HomePage userCreated :", userCreated)
	}, [userCreated])

	return (
		<div className="homePage" id="top">
			<div className="homePage__item homePage__item--hero ">
				<Hero />
			</div>
			<div className="homePage__item homePage__item--acquainted ">
				<div className="homePage__item-container ">
					<h2 className="homePage__title">Let's get acquainted</h2>
					<Acquainted />
				</div>
			</div>
			<div className="homePage__item homePage__item--users">
				<div className="homePage__item-container ">
					<h2 className="homePage__title homePage__title--withSubtitle">
						Our cheerful users
					</h2>
					<h3 className="homePage__subtitle">
						Attention! Sorting users by registration date
					</h3>
					<Users userCreated={userCreated} setUserCreated={setUserCreated} />
				</div>
			</div>
			<div id="register" className="homePage__item homePage__item ">
				<div className="homePage__item-container ">
					<h2 className="homePage__title homePage__title--withSubtitle">
						Register to get a work
					</h2>
					<h3 className="homePage__subtitle homePage__subtitle--mb40">
						Attention! After successful registration and alert, update the list of
						users in the block from the top
					</h3>
					<Form userCreated={userCreated} setUserCreated={setUserCreated} />
				</div>
			</div>
		</div>
	)
}

export default HomePage
