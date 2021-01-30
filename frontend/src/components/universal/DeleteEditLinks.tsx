import { Link } from "react-router-dom"
import React from "react"
import {
  GetPoemsDocument,
  useDeletePoemMutation,
} from "src/queries/autogenerate/hooks"

export default function DeleteEditLinks({ authorId, poemId }) {
  const isCurrentUser = true
  const [deletePoem] = useDeletePoemMutation({
    variables: { id: poemId },
    update: (cache, arg) => {
      window.location.reload()
      // cache.writeQuery({
      //   query: GetPoemsDocument,
      //   data: { type: "DELETE", payload: { id: poemId } },
      // })
    },
  })
  return (
    <span className="delete-edit-links">
      {isCurrentUser && (
        <span>
          <a
            href="#"
            onClick={() =>
              window.confirm("Are you sure you want to delete your poem?") &&
              deletePoem()
            }
          >
            delete
          </a>
          {" / "}
          <Link to={`/edit/write/${poemId}`}>edit</Link>
        </span>
      )}
    </span>
  )
}
