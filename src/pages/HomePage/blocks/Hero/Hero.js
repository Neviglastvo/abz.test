import React from "react"
import { Link } from "react-scroll"
import "./hero.sass"

const Hero = () => {
	return (
		<div className="hero">
			<picture className="hero__bg-container">
				<img
					className="hero__bg"
					sizes="(max-width: 2560px) 100vw, 2560px"
					srcSet="
						/img/hero/heroBg_360.jpg 360w,
						/img/hero/heroBg_1027.jpg 1027w,
						/img/hero/heroBg_1486.jpg 1486w,
						/img/hero/heroBg_2560.jpg 2560w"
					src="/img/hero/heroBg_2560.jpg"
					alt="Test assignment bg"
				/>
			</picture>

			<div className="hero__container">
				<h1 className="hero__title">
					Test assignment <br /> for Frontend <br /> Developer position
				</h1>

				<div className="hero__subtitle">
					We kindly remind you that your test assignment should be submitted as a
					link to github/bitbucket repository.{" "}
					<span>
						Please be patient, we consider and respond to every application that meets
						minimum requirements. We look forward to your submission. Good luck! The
						photo has to scale in the banner area on the different screens.
					</span>
				</div>

				<Link
					className="hero__action button"
					to="register"
					spy={false}
					smooth={true}
					duration={500}
				>
					Sign up now
				</Link>
			</div>
		</div>
	)
}

export default Hero
