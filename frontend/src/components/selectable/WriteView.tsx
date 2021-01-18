import React from "react"
import formatLetters from "src/utils/formatLetters"
import toggleLetters from "src/utils/toggleLetters"
import WriterToolbar from "src/components/selectable/WriterToolbar"
import { IPoem, ISelectablePoem } from "src/components/types"
import { IHandleClickLetter } from "./Word"
import SelectablePoemRender from "./SelectablePoem"
import { random } from "lodash"
import Loader from "src/components/universal/Loader"
import { useParams } from "react-router-dom"
import { useGetSinglePoemQuery } from "src/queries/autogenerate/hooks"

function getSelectable(poem: {
  textChunks: IPoem["textChunks"]
}): ISelectablePoem {
  const wordLetters = formatLetters({
    textChunks: poem.textChunks,
  })
  return { ...poem, wordLetters, isSelectingByWord: true }
}

interface IProps {
  getNewPassage: () => void
  selectablePoem: ISelectablePoem
}

class WriteView extends React.PureComponent<IProps> {
  state = this.props.selectablePoem

  static getDerivedStateFromProps(
    nextProps: IProps,
    state: IProps["selectablePoem"],
  ) {
    if (nextProps.selectablePoem.book.id !== state.book.id) {
      return nextProps.selectablePoem
    }
    return state
  }

  handleClickLetter: IHandleClickLetter = ({ wordIdx, letterIdx }) => {
    const { wordLetters, isSelectingByWord } = this.state
    const newWordLetters = toggleLetters({
      wordLetters,
      wordIdx,
      letterIdx,
      isSelectingByWord,
    })
    this.setState({ wordLetters: newWordLetters })
  }

  handleClear = () => {
    this.setState(this.props.selectablePoem)
  }

  toggleSelectBy = () => {
    this.setState({ isSelectingByWord: !this.state.isSelectingByWord })
  }

  toggleRandomLetters = () => {
    let i = 0
    let wordLetters = this.state.wordLetters
    while (i < 10) {
      i++
      // @ts-ignore
      wordLetters = toggleLetters({
        wordLetters,
        wordIdx: random(0, 100),
        letterIdx: 0,
        isSelectingByWord: true,
      })
    }
    this.setState({ wordLetters })
  }

  render() {
    return (
      <div
        className="close-up-poem-view text-center"
        onKeyPress={(e) => {
          e.shiftKey && this.toggleSelectBy()
        }}
      >
        <h1>{this.props.selectablePoem.id ? "Edit" : "Write"}</h1>
        <h5>Make your own poem by clicking on words!</h5>
        <WriterToolbar
          selectablePoem={this.state}
          getNewPassage={this.props.getNewPassage}
          handleClear={this.handleClear}
          toggleSelectBy={this.toggleSelectBy}
          toggleRandomLetters={this.toggleRandomLetters}
        />
        <SelectablePoemRender
          {...this.state}
          //@ts-ignore
          wordLetters={this.state.wordLetters}
          handleClickLetter={this.handleClickLetter}
        />
      </div>
    )
  }
}

export default function WriteViewWData() {
  const { id } = useParams()
  const { data } = useGetSinglePoemQuery({ variables: { id } })
  if (!data) return <Loader />
  const selectablePoem = {
    author: { id: data.current && data.current.id, username: "" },
    ...getSelectable({ textChunks: data.poem.textChunks }),
    ...data.poem,
  }
  const getNewPassage = () => null
  return <WriteView {...{ selectablePoem, getNewPassage }} />
}
