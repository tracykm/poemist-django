import { IHandleClickLetter } from "./Word"
import styled from "styled-components"
import PoemDiv from "src/components/poem/PoemDiv"
import { IWordLetter } from "../types"

export default function SelectablePoemRender({
  wordLetters,
  isSelectingByWord,
  handleClickLetter,
}: {
  wordLetters: IWordLetter[][]
  isSelectingByWord: boolean
  handleClickLetter: IHandleClickLetter
}) {
  return <PoemDiv className="poem close-up"></PoemDiv>
}
