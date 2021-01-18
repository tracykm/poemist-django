import React from "react"
import { useUpdatePoemMutation } from "src/queries/autogenerate/hooks"
import getSelectedTexts from "src/utils/getSelectedTexts"

export default function SavePoemButton({ poem, children }) {
  let { id, textChunks, backgroundId, colorRange } = poem
  if (poem.wordLetters) {
    textChunks = getSelectedTexts(poem.wordLetters)
  }
  const [updatePoemMutation, { data }] = useUpdatePoemMutation({
    variables: {
      id,
      textChunks,
      backgroundId,
      colorRange,
    },
  })

  return <div>{children({ onClick: updatePoemMutation })}</div>
}
