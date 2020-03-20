import React, { useState, useCallback, useEffect } from "react"
import UserCard from "pages/HomePage/pagePartials/cards/UserCard"
import { useHttp } from "hooks/http.hook"
import "./users.sass"

const Users = props => {
	const { userCreated, setUserCreated } = props

	const { request, loading } = useHttp()

	const [users, setUsers] = useState()
	const [page, setPage] = useState(1)
	const [userCount, setUserCount] = useState(6)
	const [totalPages, setTotalPages] = useState()

	const fetchUsers = useCallback(
		async (page, count) => {
			const result = await request(`/users?page=${page}&count=${count}`)

			// console.log("result :", result)
			setUsers(result.users)
			setUserCount(result.count)
			setPage(result.page)
			setTotalPages(result.total_pages)
		},
		[request],
	)

	useEffect(() => {
		fetchUsers(page, userCount)
	}, [fetchUsers, page, userCount])

	useEffect(() => {
		console.log("page :", page)
		console.log("userCount :", userCount)
		console.log("USERS userCreated :", userCreated)
		if (userCreated) {
			setPage(1)
			setUserCount(6)
			setUserCreated(false)
			return
		}
		setPage(page)
		setUserCount(userCount)
	}, [page, userCreated, userCount, setUserCreated])

	const handleClick = () => {
		// console.log("click :", "click")
		setUserCount(userCount + 6)
		setPage(page)
	}

	if (loading) {
		return <div className="empty">Loading</div>
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
					<div className="users__action button" onClick={handleClick}>
						Show more
					</div>
				)}
			</div>
		)
	}
}

export default Users
