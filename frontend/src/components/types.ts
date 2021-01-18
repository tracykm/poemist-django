import { GetSinglePoemQuery } from "src/queries/autogenerate/operations"

export type IPoem = GetSinglePoemQuery["poem"]
export type ITextChunk = IPoem["textChunks"][0]

export interface IWordLetter {
  isSelected: boolean
  ch: string
}

export interface ISelectablePoem extends Partial<IPoem> {
  wordLetters: Array<IWordLetter[]>
  isSelectingByWord: boolean
}
