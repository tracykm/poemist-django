import { Link } from "react-router-dom"
import { Link as MuiLink } from "@material-ui/core"
import {
  useDeletePoemMutation,
  useGetCurrentUserQuery,
} from "src/queries/autogenerate/hooks"

export default function DeleteEditLinks({ authorId, poemId }) {
  const [{ data }] = useGetCurrentUserQuery()
  const isCurrentUser = data?.current?.id === authorId
  const [_, deletePoemMutation] = useDeletePoemMutation()
  return (
    <span className="delete-edit-links">
      {isCurrentUser && (
        <span>
          <MuiLink
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete your poem?")
              ) {
                deletePoemMutation({
                  id: poemId,
                }).then((res) => {
                  debugger
                  return res.data
                })
              }
            }}
          >
            delete
          </MuiLink>
          {" / "}
          <Link to={`/edit/write/${poemId}`}>edit</Link>
        </span>
      )}
    </span>
  )
}
