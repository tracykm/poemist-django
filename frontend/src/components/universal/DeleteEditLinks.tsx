import { Link } from "react-router-dom"
import React from "react"
import {
  GetPoemsDocument,
  GetPoemsByAuthorDocument,
  useDeletePoemMutation,
  useGetCurrentUserQuery,
} from "src/queries/autogenerate/hooks"
import produce from "immer"
import { GetPoemsQuery } from "src/queries/autogenerate/operations"
import { Link as MuiLink } from "@material-ui/core"
import updateCache from "src/utils/updateCache"

export default function DeleteEditLinks({ authorId, poemId }) {
  const { data } = useGetCurrentUserQuery()
  const isCurrentUser = data?.current.id === authorId
  const [deletePoem] = useDeletePoemMutation({
    variables: { id: poemId },
    update: (cache, arg) => {
      const poemId = arg.data.deletePoem.id
      const updateData = (data) =>
        produce(data, (draft: GetPoemsQuery) => {
          var idx = draft.poemPages.edges.findIndex((d) => d.id === poemId)
          draft.poemPages.edges.splice(idx, 1)
        })
      updateCache({
        cache,
        arg: { query: GetPoemsDocument, variables: { limit: 10 } },
        updateData,
      })
      updateCache({
        cache,
        arg: {
          query: GetPoemsByAuthorDocument,
          variables: { limit: 10, authorId },
        },
        updateData,
      })
    },
  })
  return (
    <span className="delete-edit-links">
      {isCurrentUser && (
        <span>
          <MuiLink
            onClick={() =>
              window.confirm("Are you sure you want to delete your poem?") &&
              deletePoem()
            }
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
