import { useHistory } from "react-router-dom"
import {
  useCreatePoemMutation,
  useGetCurrentUserQuery,
  useUpdatePoemMutation,
} from "src/queries/autogenerate/hooks"
import getSelectedTexts from "src/utils/getSelectedTexts"

export default function SavePoemButton({ poem, children }) {
  const history = useHistory()
  const [{ data }] = useGetCurrentUserQuery()
  const author = data?.current
  let { id, textChunks, backgroundId, colorRange, book, startIdx } = poem
  const bookId = book?.id
  if (poem.wordLetters) {
    textChunks = getSelectedTexts(poem.wordLetters)
  } else {
    textChunks = textChunks.map(({ __typename, ...rest }) => rest)
  }
  const [updatePoemResult, updatePoemMutation] = useUpdatePoemMutation()
  const updatePoemFunc = () => {
    debugger
    return updatePoemMutation({
      id,
      textChunks,
      backgroundId,
      colorRange,
    })
  }
  const [createPoemResult, createPoemMutation] = useCreatePoemMutation()
  const createPoemFunc = () =>
    createPoemMutation({
      textChunks,
      bookId,
      startIdx,
    })

  let savePoem: any = id ? updatePoemFunc : createPoemFunc
  if (!author) {
    savePoem = () => {
      history.push("?showSignUp=true")
      return Promise.reject()
    }
  }

  return <>{children({ savePoem })}</>
}
