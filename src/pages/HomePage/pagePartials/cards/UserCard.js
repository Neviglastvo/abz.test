import React from "react"
import EllipsisWithTooltip from "react-ellipsis-with-tooltip"

import "./UserCard.sass"

const UserCard = props => {
	const { name, email, phone, position, photo } = props.user

	// console.log(!photo)

	return (
		<div className="card-user">
			<div className="card-user__avatar">
				<img
					src={photo}
					alt={name}
					className="card-user__avatar-img"
					onError={e => {
						e.target.src = "/img/user/photo-cover.png"
					}}
				/>
			</div>
			<div className="card-user__title">{name}</div>
			<div className="card-user__subtitle">{position}</div>
			<div className="card-user__subtitle">
				<EllipsisWithTooltip placement="bottom">{email}</EllipsisWithTooltip>
			</div>

			<div className="card-user__subtitle card-user__subtitle--phone">{phone}</div>
		</div>
	)
}

export default UserCard
