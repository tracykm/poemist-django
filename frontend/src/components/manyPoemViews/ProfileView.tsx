import moment from "moment"
import IndexView from "src/components/manyPoemViews/IndexView"
import Loader from "../universal/Loader"
import { getPoemsByAuthor } from "src/queries/poems"
import { useParams } from "react-router-dom"
import {
  useGetCurrentUserQuery,
  useGetUserQuery,
} from "src/queries/autogenerate/hooks"

const ProfileHeader = ({ id }) => {
  const [{ data }] = useGetUserQuery({ variables: { id } })
  const [currentUserRes] = useGetCurrentUserQuery()
  const currentUserId = currentUserRes.data?.current?.id
  if (!data) return <Loader />
  const { user } = data
  const isCurrentUser = currentUserId === user.id
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
  return (
    <IndexView query={getPoemsByAuthor} variables={{ authorId, limit: 10 }} />
  )
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
