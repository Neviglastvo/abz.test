import React from "react"
import "./acquainted.sass"

const Acquainted = () => {
	return (
		<div className="acquainted">
			<div className="acquainted__row">
				<div className="acquainted__col">
					<img
						src="/img/acquainted/man-laptop-v1.svg"
						alt="man-laptop"
						className="acquainted__img"
					/>
				</div>
				<div className="acquainted__col">
					<div className="acquainted__title">I am cool frontend developer</div>
					<div className="acquainted__text">
						<p>
							We will evaluate how clean your approach to writing CSS and Javascript
							code is. You can use any CSS and Javascript 3rd party libraries without
							any restriction.
						</p>
						<p>
							If 3rd party css/javascript libraries are added to the project via
							bower/npm/yarn you will get bonus points. If you use any task runner
							(gulp/webpack) you will get bonus points as well. Slice service directory
							page P​SD mockup​ into HTML5/CSS3.
						</p>
					</div>
					<a href="#register" className="acquainted__link">
						Sign up now
					</a>
				</div>
			</div>
		</div>
	)
}

export default Acquainted
