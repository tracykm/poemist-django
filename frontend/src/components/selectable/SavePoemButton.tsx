import { useHistory } from "react-router-dom"
import { updatePoem, createPoem } from "src/queries/poems"
import { getCurrentUser } from "src/queries/users"
import getSelectedTexts from "src/utils/getSelectedTexts"
import { useMutation, useQuery } from "urql"

export default function SavePoemButton({ poem, children }) {
  const history = useHistory()
  const [{ data }] = useQuery({ query: getCurrentUser })
  const author = data?.current
  let { id, textChunks, backgroundId, colorRange, book, startIdx } = poem
  const bookId = book?.id
  if (poem.wordLetters) {
    textChunks = getSelectedTexts(poem.wordLetters)
  } else {
    textChunks = textChunks.map(({ __typename, ...rest }) => rest)
  }
  const [updatePoemResult, updatePoemMutation] = useMutation(updatePoem)
  const updatePoemFunc = () => {
    debugger
    return updatePoemMutation({
      id,
      textChunks,
      backgroundId,
      colorRange,
    })
  }
  const [createPoemResult, createPoemMutation] = useMutation(createPoem)
  const createPoemFunc = () =>
    createPoemMutation({
      textChunks,
      bookId,
      startIdx,
    })

  let savePoem = id ? updatePoemFunc : createPoemFunc
  if (!author) {
    savePoem = () => {
      history.push("?showSignUp=true")
      return Promise.reject()
    }
  }

  return <>{children({ savePoem })}</>
}
