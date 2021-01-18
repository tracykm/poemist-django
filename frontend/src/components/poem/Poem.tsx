import React from "react"
import PoemHeader from "./PoemHeader"
import PoemBody from "./PoemBody"
import PoemFooter from "./PoemFooter"
import PoemDiv from "src/components/poem/PoemDiv"
import { GetSinglePoemQuery } from "src/queries/autogenerate/operations"
import Loader from "../universal/Loader"

export default function Poem(props: {
  poem: GetSinglePoemQuery["poem"]
  closeUp?: boolean
}) {
  const { poem } = props
  if (!poem) {
    return (
      <div className="poem">
        <Loader />
      </div>
    )
  }
  const { id, backgroundId, colorRange, textChunks, author } = poem
  if (!author.id) return null

  return (
    <PoemDiv
      className={`poem style-${backgroundId} color-${colorRange} ${
        props.closeUp ? "close-up" : ""
      }`}
      data-test={`poem${id}`}
      data-cy="poem"
    >
      <div className="background-img" />
      <PoemHeader poemId={id} authorId={author.id} />
      <PoemBody textChunks={textChunks} />
      <PoemFooter authorUsername={author.username} authorId={author.id} />
    </PoemDiv>
  )
}
