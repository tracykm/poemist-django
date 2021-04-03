import { Link } from "react-router-dom"
import { deletePoem } from "src/queries/poems"
import { getCurrentUser } from "src/queries/users"
import { Link as MuiLink } from "@material-ui/core"
import { useMutation, useQuery } from "urql"

export default function DeleteEditLinks({ authorId, poemId }) {
  const [{ data }] = useQuery({ query: getCurrentUser })
  const isCurrentUser = data?.current?.id === authorId
  const [_, deletePoemMutation] = useMutation(deletePoem)
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
                  fetch: () => {
                    console.log("")
                  },
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
