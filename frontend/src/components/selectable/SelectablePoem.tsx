import { IHandleClickLetter } from "./Word"
import PoemDiv from "src/components/poem/PoemDiv"
import { IWordLetter } from "../types"

export default function SelectablePoemRender({}: {
  wordLetters: IWordLetter[][]
  isSelectingByWord: boolean
  handleClickLetter: IHandleClickLetter
}) {
  return <PoemDiv className="poem close-up"></PoemDiv>
}
