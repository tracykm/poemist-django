import { BodyDiv } from "src/components/poem/PoemDiv"
import { TextChunkType } from "src/queries/autogenerate/schemas"

const TextSpan = ({ isSelected, text }: TextChunkType) => (
  <span className={isSelected ? "is-selected" : "not-selected"}>
    <span className="text">{text}</span>
  </span>
)

export default function PoemBody({
  textChunks,
}: {
  textChunks: TextChunkType[]
}) {
  return (
    <BodyDiv className="poem-text">
      {textChunks &&
        textChunks.map((textSpan, i) => <TextSpan key={i} {...textSpan} />)}
    </BodyDiv>
  )
}
