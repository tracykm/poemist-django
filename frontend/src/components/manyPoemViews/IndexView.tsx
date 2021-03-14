import Poem from "src/components/poem/Poem"
import styled from "styled-components"
import { GetPoemsQuery } from "src/queries/autogenerate/operations"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../universal/Loader"
import produce from "immer"
import { sizes } from "../universal/_variables"

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

export default function IndexView({
  poems,
  fetchMore,
}: {
  poems: GetPoemsQuery["poemPages"]
  fetchMore?: (vars: any) => Promise<any>
}) {
  return (
    <PoemContainerDiv>
      <InfiniteScroll
        loadMore={(page) => {
          return fetchMore({
            variables: { offset: 10 * page, limit: 10 },
            updateQuery: (prevResult, { fetchMoreResult }) =>
              produce(prevResult, (draft) => {
                draft.poemPages.edges.push(...fetchMoreResult.poemPages.edges)
              }),
          })
        }}
        hasMore={!(poems.edges.length % 10)}
        loader={<Loader />}
      >
        {poems &&
          poems.edges.map((poem) => {
            return <Poem poem={poem} key={poem.id} />
          })}
      </InfiniteScroll>
    </PoemContainerDiv>
  )
}
