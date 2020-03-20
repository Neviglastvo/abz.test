import { useHttp } from "hooks/http.hook"
import React, { useEffect, useState, useCallback } from "react"
import { ErrorMessage, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
import Modal from "components/Modal/Modal"
import "./form.sass"

const Form = props => {
	const { userCreated, setUserCreated } = props

	const { register, handleSubmit, errors, triggerValidation } = useForm({
		validateCriteriaMode: "all",
		mode: "onBlur",
	})
	const { request, loading } = useHttp()

	const [imageName, setImageName] = useState("")
	const [positions, setPositions] = useState("")

	const [openPopup, setOpenPopup] = useState(false)

	const onSubmit = data => {
		console.log("actual data", data)
		data.phone = data.phone.replace(/\s/g, "")

		console.log("transformed data", data)
		// try {
		// 	await request("/generate", "POST", { ...values })
		// 	// fetchComponents()
		// } catch (error) {
		// 	console.error(error)
		// }
		setOpenPopup(true)
		setUserCreated(true)
	}
	const fetchPositions = useCallback(async () => {
		const result = await request(`/positions`)

		setPositions(result.positions)
	}, [request])

	useEffect(() => {
		fetchPositions()
	}, [fetchPositions])

	const showError = name => (
		<ErrorMessage errors={errors} name={name}>
			{({ messages }) => {
				console.log(messages)
				return (
					messages &&
					Object.entries(messages).map(([type, message]) => (
						<p key={type}>{message}</p>
					))
				)
			}}
		</ErrorMessage>
	)

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<Modal
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
				formTitle="Congratulations"
				btnTitle="Great"
			>
				You have successfully passed the registration
			</Modal>

			<div className="form__item">
				<label htmlFor="name" className="form__label">
					Name
				</label>
				<input
					id="name"
					name="name"
					type="text"
					className="form__input"
					placeholder="Your name"
					ref={register({
						required: "Name is required.",
						minLength: {
							value: 2,
							message: "Min length 2.",
						},
						maxLength: {
							value: 60,
							message: "Max length 60.",
						},
					})}
				/>
				{showError("name")}
			</div>

			<div className="form__item">
				<label htmlFor="email" className="form__label">
					Email
				</label>
				<input
					id="email"
					name="email"
					type="text"
					className="form__input"
					placeholder="Your email"
					ref={register({
						required: "Email is required.",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: "Invalid email address",
						},
						minLength: {
							value: 2,
							message: "Min length 2.",
						},
						maxLength: {
							value: 100,
							message: "Max length 100.",
						},
					})}
				/>
				{showError("email")}
			</div>

			<div className="form__item">
				<label htmlFor="phone" className="form__label">
					Phone
				</label>
				<InputMask
					id="phone"
					name="phone"
					type="text"
					className="form__input"
					mask="+380 99 999 99 99"
					maskChar=" "
					placeholder="+380 XX XXX XX XX"
					// alwaysShowMask
					inputRef={register({
						required: "Phone is required",
						pattern: {
							value: /^[+]{0,1}380\s([0-9]{2})\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})$/,
							message: "Invalid phone number",
						},
					})}
				/>

				<div className="form__item-subtitle">
					Еnter phone number in openPopup format
				</div>
				{showError("phone")}
			</div>

			<div className="form__item form__item--start">
				{positions && !loading ? (
					positions.map(position => (
						<div className="form__item-container" key={position.id}>
							<input
								type="radio"
								id={`position-${position.id}`}
								name="position"
								value={position.id}
								ref={register({
									required: "Put one of this pls",
								})}
							/>
							<label htmlFor={`position-${position.id}`}>{position.name}</label>
						</div>
					))
				) : (
					<div>empty</div>
				)}

				{showError("position")}
			</div>

			<div className="form__item">
				<label htmlFor="image" className="form__label">
					Photo
				</label>
				<div className="form__item-file">
					<input
						id="image"
						type="file"
						name="image"
						className="form__input"
						placeholder="asdas"
						ref={register({
							required: "Attach something",
							validate: {
								size: value => {
									if (value[0]) {
										if (value[0].size >= 502400) {
											return "too heavy"
										}
									}
								},
								extension: value => {
									const validExt = ["image/jpg", "image/jpeg"]
									if (value[0] && !validExt.includes(value[0].type)) {
										console.log("true type")
										return "wrong type"
									}
								},
							},
						})}
						onChange={e => {
							setImageName(e.target.value)
						}}
					/>
					<label htmlFor="image">
						<div>
							{imageName !== ""
								? imageName
										.split("\\")
										.pop()
										.split("/")
										.pop()
								: "Upload your photo"}
						</div>
						<span>Browse</span>
					</label>
				</div>
				{showError("image")}
			</div>

			<button
				type="submit"
				className={`form__action button ${loading && "disabled"}`}
				disabled={loading && true}
			>
				Sign up now
			</button>
		</form>
	)
}

export default Form
