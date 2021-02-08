import produce from "immer"
import React from "react"
import {
  useUpdatePoemMutation,
  useCreatePoemMutation,
  GetPoemsDocument,
  GetPoemsByAuthorDocument,
  useGetCurrentUserQuery,
} from "src/queries/autogenerate/hooks"
import { GetPoemsQuery } from "src/queries/autogenerate/operations"
import getSelectedTexts from "src/utils/getSelectedTexts"
import updateCache from "src/utils/updateCache"

export default function SavePoemButton({ poem, children }) {
  const { data } = useGetCurrentUserQuery()
  const author = data?.current
  let { id, textChunks, backgroundId, colorRange, book } = poem
  const bookId = book?.id
  if (poem.wordLetters) {
    textChunks = getSelectedTexts(poem.wordLetters)
  } else {
    textChunks = textChunks.map(({ __typename, ...rest }) => rest)
  }
  const [updatePoemMutation] = useUpdatePoemMutation({
    variables: {
      id,
      textChunks,
      backgroundId,
      colorRange,
    },
  })
  const [createPoemMutation] = useCreatePoemMutation({
    variables: {
      textChunks,
      bookId,
    },
    update: (cache, arg) => {
      const updateData = (data) => {
        return produce(data, (draft: GetPoemsQuery) => {
          draft.poemPages.edges.unshift(arg.data.createPoem.poem)
        })
      }
      updateCache({
        cache,
        arg: { query: GetPoemsDocument, variables: { limit: 10 } },
        updateData,
      })
      updateCache({
        cache,
        arg: {
          query: GetPoemsByAuthorDocument,
          variables: { limit: 10, authorId: author.id },
        },
        updateData,
      })
    },
  })

  return (
    <div>
      {children({ savePoem: id ? updatePoemMutation : createPoemMutation })}
    </div>
  )
}
