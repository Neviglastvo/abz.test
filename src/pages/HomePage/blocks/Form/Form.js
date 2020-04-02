import Modal from "components/Modal/Modal"
import { useHttp } from "hooks/http.hook"
import React, { useCallback, useEffect, useState } from "react"
import { ErrorMessage, useForm } from "react-hook-form"
import InputMask from "react-input-mask"
import "./form.sass"

const Form = props => {
	const { setUserCreated } = props

	const { register, handleSubmit, errors } = useForm({
		validateCriteriaMode: "all",
		mode: "onBlur",
	})
	const { request, loading } = useHttp()

	const [photoName, setPhotoName] = useState("Upload your photo")
	const [photoFile, setPhotoFile] = useState("")
	const [positions, setPositions] = useState("")
	const [token, setToken] = useState("")

	const [openPopup, setOpenPopup] = useState(false)

	const fetchPositions = useCallback(async () => {
		const result = await request(`/positions`)
		setPositions(result.positions)
	}, [request])

	const fetchToken = useCallback(async () => {
		const result = await request(`/token`)
		setToken(result.token)
	}, [request])

	useEffect(() => {
		fetchPositions()
		fetchToken()
	}, [fetchPositions, fetchToken])

	const onSubmit = async (data, e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append("position_id", data.position_id)
		formData.append("name", data.name)
		formData.append("email", data.email.toLowerCase())
		formData.append("phone", data.phone.replace(/\s/g, ""))
		formData.append("photo", photoFile)

		data.email = data.email.toLowerCase()
		data.phone = data.phone.replace(/\s/g, "")
		data.photo = data.photo[0]

		try {
			await request("/users", "POST", formData, {
				Token: token,
			})
		} catch (err) {
			console.log("err", err)
		}

		setOpenPopup(true)
		setUserCreated(true)
	}

	const showError = name => (
		<ErrorMessage errors={errors} name={name}>
			{({ messages }) => {
				console.log(messages)
				return (
					messages &&
					Object.entries(messages).map(([type, message]) => (
						<p className="form__item-subtitle form__item-subtitle--error" key={type}>
							{message}
						</p>
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
				<label htmlFor="name" className="form__item-title">
					Name
				</label>
				<input
					id="name"
					name="name"
					defaultValue="Maxwell Skiles"
					type="text"
					placeholder="Your name"
					ref={register({
						required: "The name is required",
						minLength: {
							value: 2,
							message: "The name must be at least 2 characters",
						},
						maxLength: {
							value: 60,
							message: "The name must be less than 60 characters",
						},
					})}
				/>
				{showError("name")}
			</div>

			<div className="form__item">
				<label htmlFor="email" className="form__item-title">
					Email
				</label>
				<input
					id="email"
					name="email"
					defaultValue="imelda90@hotmail.com"
					type="text"
					placeholder="Your email"
					ref={register({
						required: "The email is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: "The email must be a valid email address",
						},
					})}
				/>
				{showError("email")}
			</div>

			<div className="form__item">
				<label htmlFor="phone" className="form__item-title">
					Phone number
				</label>
				<InputMask
					id="phone"
					name="phone"
					type="text"
					defaultValue="+380 12 312 31 23"
					mask="+380 99 999 99 99"
					maskChar=" "
					placeholder="+380 XX XXX XX XX"
					// alwaysShowMask
					inputRef={register({
						required: "The phone field is required",
						pattern: {
							value: /^[+]{0,1}380\s([0-9]{2})\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})$/,
							message: "Invalid phone number",
						},
					})}
				/>

				<div className="form__item-subtitle">Enter phone number in open format</div>
				{showError("phone")}
			</div>

			<div className="form__item form__item--alignStart">
				<label
					htmlFor="position_id"
					className="form__label form__label--moreMargin"
				>
					Select your position
				</label>

				{positions && !loading ? (
					positions.map(position => (
						<div className="form__item-container" key={position.id}>
							<input
								type="radio"
								id={`position-${position.id}`}
								name="position_id"
								value={position.id}
								ref={register({
									required: "Put one of this pls",
								})}
							/>
							<span></span>
							<label htmlFor={`position-${position.id}`}>{position.name}</label>
						</div>
					))
				) : (
					<div>empty</div>
				)}

				{showError("position_id")}
			</div>

			<div className="form__item">
				<label htmlFor="photo" className="form__item-title">
					Photo
				</label>
				<div className="form__item-file">
					<input
						id="photo"
						type="file"
						name="photo"
						accept=".jpg, .jpeg"
						ref={register({
							required: "Attach something",
							validate: {
								size: value => {
									if (value[0] && value[0].size >= 502400) {
										return "The photo may not be greater than 5 Mbytes"
									}
								},
								extension: value => {
									const validExt = ["image/jpg", "image/jpeg"]
									if (value[0] && !validExt.includes(value[0].type)) {
										return "The photo must be .jpg or .jpeg"
									}
								},
								sizes: value => {
									if (value[0]) {
										const photo = value[0]
										let photoWidth, photoHeight

										let reader = new FileReader()

										reader.onload = function(e) {
											let img = new Image()
											img.src = e.target.result

											img.onload = function() {
												photoWidth = this.width
												photoHeight = this.height
											}
										}
										reader.readAsDataURL(photo)

										if (photoWidth < 70 || photoHeight < 70) {
											return `The photo minimum resolution are 70x70px`
										}
									}
								},
							},
						})}
						onChange={e => {
							setPhotoFile(e.target.files[0])
							setPhotoName(e.target.files[0].name)
						}}
					/>
					<label htmlFor="photo">
						<div>{photoName}</div>
						<span>Browse</span>
					</label>
				</div>
				{showError("photo")}
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
