import { useHttp } from "hooks/http.hook"
import UserCard from "pages/HomePage/blocks/Users/UserCard/UserCard"
import React, { useCallback, useEffect, useState } from "react"
import "./users.sass"

const Users = props => {
	const { userCreated, setUserCreated } = props

	const { request, loading } = useHttp()

	const [users, setUsers] = useState()
	const [userCount, setUserCount] = useState(6)
	const [totalPages, setTotalPages] = useState()

	const fetchUsers = useCallback(
		async count => {
			const result = await request(`/users?count=${count}`)

			setUsers(result.users)
			setTotalPages(result.total_pages)
		},
		[request],
	)

	useEffect(() => {
		console.log("users :", users)
		console.log("userCount :", userCount)
	}, [users, userCount])

	useEffect(() => {
		fetchUsers(userCount)
	}, [fetchUsers, userCount])

	useEffect(() => {
		if (userCreated) {
			setUserCount(6)
			setUserCreated(false)
			fetchUsers(userCount)
			return
		}
		setUserCount(userCount)
	}, [userCreated, userCount, setUserCreated, fetchUsers])

	const handleClick = () => {
		setUserCount(userCount + 6)
	}

	if (loading) {
		return <div>Loading</div>
	} else {
		return (
			<div className="users">
				<div className="users__list">
					<div className="users__list-container">
						{users && !loading ? (
							users.map(user => (
								<div className="users__list-item" key={user.id}>
									<UserCard user={user} />
								</div>
							))
						) : (
							<div>empty</div>
						)}
					</div>
				</div>

				{totalPages === 1 ? (
					""
				) : (
					<div
						className="users__action button"
						onClick={handleClick}
						disabled={loading && true}
					>
						Show more
					</div>
				)}
			</div>
		)
	}
}

export default Users
