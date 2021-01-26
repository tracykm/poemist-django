import React from "react"
import moment from "moment"
import IndexView from "src/components/manyPoemViews/IndexView"
import Loader from "../universal/Loader"
import {
  useGetUserQuery,
  useGetPoemsByAuthorQuery,
} from "src/queries/autogenerate/hooks"
import { useParams } from "react-router-dom"

const ProfileHeader = ({ id }) => {
  const { data } = useGetUserQuery({ variables: { id } })
  if (!data) return <Loader />
  const { current, user } = data
  const isCurrentUser = current?.id === user.id
  const pronoun = isCurrentUser ? "you" : "they"
  const poemsWrittenCount = user && user.poemsWrittenCount
  const dateJoined = user && moment(user.dateJoined).fromNow()
  return (
    <div className="mx-3">
      <h1>{user && user.username}</h1>
      <div>
        Poems Written: <strong>{poemsWrittenCount}</strong>
      </div>
      <div>
        Signed Up: <strong>{dateJoined}</strong>
      </div>
      <h5>Look at all the lovely poems {pronoun} have written!</h5>
    </div>
  )
}

function UserPoems({ authorId }) {
  const { data, fetchMore } = useGetPoemsByAuthorQuery({
    variables: { authorId, limit: 10 },
  })
  if (!data) return <Loader />
  return <IndexView poems={data.poemPages} fetchMore={fetchMore} />
}

export default function ProfileView() {
  const { id } = useParams<{ id: string }>()
  return (
    <div className="index-view">
      <ProfileHeader id={id} />
      <UserPoems authorId={id} />
    </div>
  )
}
