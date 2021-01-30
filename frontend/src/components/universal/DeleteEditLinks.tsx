import { Link } from "react-router-dom"
import React from "react"
import {
  GetPoemsDocument,
  useDeletePoemMutation,
} from "src/queries/autogenerate/hooks"
import produce from "immer"
import { GetPoemsQuery } from "src/queries/autogenerate/operations"

export default function DeleteEditLinks({ authorId, poemId }) {
  const isCurrentUser = true
  const [deletePoem] = useDeletePoemMutation({
    variables: { id: poemId },
    refetchQueries: [{ query: GetPoemsDocument }],
    update: (cache, arg) => {
      const data = cache.readQuery({ query: GetPoemsDocument })
      const newData = produce(data, (draft: GetPoemsQuery) => {
        var idx = draft.poemPages.edges.findIndex(
          (d) => d.id === arg.data.deletePoem.id,
        )
        debugger
        draft.poemPages.edges.splice(idx, 1)
        debugger
      })
      debugger
      cache.writeQuery({ query: GetPoemsDocument, data: newData })
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
