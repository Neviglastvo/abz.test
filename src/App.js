import Footer from "components/Footer/Footer"
import Header from "components/Header/Header"
import NavMobile from "components/NavMobile/NavMobile"
import HomePage from "pages/HomePage/page/HomePage"
import React, { useState } from "react"

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
