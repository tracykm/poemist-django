import * as React from "react"
import { Link } from "react-router-dom"

const UsernameLink = ({
  username,
  userId,
}: {
  username?: string
  userId: string
}) => (
  <div className="username" data-cy="usernameLink">
    <Link to={`/user/${userId}`}>{username}</Link>
  </div>
)

export default UsernameLink
