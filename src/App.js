import React, { useState } from "react"

import HomePage from "pages/HomePage/HomePage"
import Footer from "components/Footer/Footer"
import Header from "components/Header/Header"
import NavMobile from "components/NavMobile/NavMobile"

function App() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Header open={open} setOpen={setOpen} />
			<NavMobile open={open} setOpen={setOpen} />
			<HomePage />
			<Footer />
		</>
	)
}

export default App
