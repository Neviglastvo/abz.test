import React from "react"
import "./modal.sass"

const Modal = ({ ...props }) => {
	const { openPopup, setOpenPopup, formTitle, btnTitle, children } = props
	const content = openPopup && (
		<div className="modal-overlay">
			<div className="modal">
				<div className="modal__container">
					<div className="modal__title">
						{formTitle}
						<div className="modal__close" onClick={() => setOpenPopup(false)}></div>
					</div>
					<div className="modal__content">{children}</div>
					<div className="modal__actions">
						<div
							className="button button--widthAuto"
							onClick={() => setOpenPopup(false)}
						>
							{btnTitle}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
	return content
}

export default Modal
