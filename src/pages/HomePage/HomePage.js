import React, { useState, useEffect } from "react"
import "./homePage.sass"
import Acquainted from "./pageBlock/Acquainted/Acquainted"
import Form from "./pagePartials/Form/Form"
import Users from "./pagePartials/Users/Users"
import Hero from "./pageBlock/Hero/Hero"

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
					<h3 className="homePage__title">Let's get acquainted</h3>
					<Acquainted />
				</div>
			</div>
			<div className="homePage__item homePage__item--users">
				<div className="homePage__item-container ">
					<h3 className="homePage__title homePage__title--withSubtitle">
						Our cheerful users
					</h3>
					<h4 className="homePage__subtitle">
						Attention! Sorting users by registration date
					</h4>
					<Users userCreated={userCreated} setUserCreated={setUserCreated} />
				</div>
			</div>
			<div id="register" className="homePage__item homePage__item ">
				<div className="homePage__item-container ">
					<h3 className="homePage__title homePage__title--withSubtitle">
						Register to get a work
					</h3>
					<h4 className="homePage__subtitle homePage__subtitle--mb40">
						Attention! After successful registration and alert, update the list of
						users in the block from the top
					</h4>
					<Form userCreated={userCreated} setUserCreated={setUserCreated} />
				</div>
			</div>
		</div>
	)
}

export default HomePage
