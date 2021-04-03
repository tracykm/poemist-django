import Poem from "src/components/poem/Poem"
import styled from "styled-components"
import { GetPoemsQuery } from "src/queries/autogenerate/operations"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../universal/Loader"
import produce from "immer"
import { sizes } from "../universal/_variables"
import { DocumentNode } from "graphql"
import { useQuery } from "urql"
import { useState } from "react"

export const LoadingPoemDiv = styled.div`
  width: ${sizes.poemWidth}px;
  height: 450px;
  margin: 16px;
  background: #ddd;
  display: inline-block;
`

export const PoemContainerDiv = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${sizes.poemWidth}px, 1fr));
  grid-gap: 10px;
  > div {
    text-align: center;
    margin-left: -2rem;
    margin-right: -2rem;
  }
`

function PageOfPoems({
  query,
  variables = {},
}: {
  query: DocumentNode
  variables?: Record<string, any>
}) {
  const [{ data, fetching }] = useQuery({ query, variables })
  if (fetching) {
    return <Loader />
  }
  return data.poemPages?.edges.map((poem) => {
    return <Poem poem={poem} key={poem.id} />
  })
}

export default function IndexView({
  query,
  variables = { limit: 10, offset: 0 },
}: {
  query: DocumentNode
  variables?: Record<string, any>
}) {
  const [pageVariables, setPageVariables] = useState([variables])
  return (
    <PoemContainerDiv>
      <InfiniteScroll
        loadMore={(page) => {
          // debugger
          setPageVariables([
            ...pageVariables,
            { offset: 10 * page, limit: 10, ...variables },
          ])
        }}
        hasMore={pageVariables.length < 5}
        loader={<Loader />}
      >
        {pageVariables.map((variables) => (
          <PageOfPoems {...{ query, variables }} />
        ))}
      </InfiniteScroll>
    </PoemContainerDiv>
  )
}
