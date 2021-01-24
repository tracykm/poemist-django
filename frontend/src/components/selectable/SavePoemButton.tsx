import React from "react"
import {
  useUpdatePoemMutation,
  useCreatePoemMutation,
} from "src/queries/autogenerate/hooks"
import getSelectedTexts from "src/utils/getSelectedTexts"
import { GetSinglePoemDocument } from "src/queries/autogenerate/hooks"

export default function SavePoemButton({ poem, children }) {
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
    refetchQueries: [{ query: GetSinglePoemDocument, variables: { id } }],
  })
  const [createPoemMutation] = useCreatePoemMutation({
    variables: {
      textChunks,
      bookId,
    },
  })

  return (
    <div>
      {children({ savePoem: id ? updatePoemMutation : createPoemMutation })}
    </div>
  )
}
