import moment from "moment"
import IndexView from "src/components/manyPoemViews/IndexView"
import Loader from "../universal/Loader"
import { getCurrentUser, getUser } from "src/queries/users"
import { getPoemsByAuthor } from "src/queries/poems"
import { useParams } from "react-router-dom"
import { useQuery } from "urql"

const ProfileHeader = ({ id }) => {
  const [{ data }] = useQuery({ query: getUser, variables: { id } })
  const [currentUserRes] = useQuery({ query: getCurrentUser })
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
  const [{ data }, reexecuteQuery] = useQuery({
    query: getPoemsByAuthor,
    variables: { authorId, limit: 10 },
  })
  if (!data) return <Loader />
  return <IndexView poems={data.poemPages} fetchMore={reexecuteQuery} />
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
