import produce from "immer"
import { IWordLetter } from "src/components/types"

function toggleLetters({
  wordLetters: w,
  wordIdx,
  letterIdx,
  isSelectingByWord,
}: {
  wordLetters: Array<IWordLetter[]>
  wordIdx: number
  letterIdx: number
  isSelectingByWord: boolean
}): Array<IWordLetter[]> {
  return produce(w, (wordLetters) => {
    if (isSelectingByWord) {
      if (!wordLetters[wordIdx]) {
        console.warn(
          `Word out of range, tried to access ${wordIdx} of ${wordLetters.flatMap.length}`,
        )
        return wordLetters
      }
      const isSelected = !wordLetters[wordIdx][letterIdx].isSelected // current letter's state
      // all letters in word should change together
      wordLetters[wordIdx].forEach((letter) => {
        letter.isSelected = isSelected
      })
      return wordLetters
    } else {
      wordLetters[wordIdx][letterIdx].isSelected = !wordLetters[wordIdx][
        letterIdx
      ].isSelected
      return wordLetters
    }
  })
}

export default toggleLetters
