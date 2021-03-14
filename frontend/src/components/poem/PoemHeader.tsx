import DeleteEditLinks from "src/components/universal/DeleteEditLinks"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { sizes } from "src/components/universal/_variables"

const HeaderDiv = styled.div`
  width: ${sizes.poemWidth}px;
  &.close-up {
    width: ${sizes.poemWidth * 2}px;
  }
  text-align: right;
  position: relative;
  z-index: 20;
  background: black;

  .delete-edit-links {
    float: left;
  }
`

export default function PoemHeader({
  authorId,
  poemId,
}: {
  authorId: string
  poemId: string
}) {
  return (
    <HeaderDiv className="poem-header">
      <DeleteEditLinks {...{ authorId, poemId }} />
      {poemId && (
        <Link to={`/poem/${poemId}`} data-cy="view-close-up-poem">
          view
        </Link>
      )}
    </HeaderDiv>
  )
}
