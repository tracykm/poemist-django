import React from "react"
import Poem from "src/components/poem/Poem"
import styled from "styled-components"
import { GetPoemsQuery } from "src/queries/autogenerate/operations"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../universal/Loader"

export const LoadingPoemDiv = styled.div`
  width: 250px;
  height: 450px;
  margin: 16px;
  background: #ddd;
  display: inline-block;
`

export const PoemContainerDiv = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
          return fetchMore({ variables: { offset: 10 * page, limit: 10 } })
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

// class IndexViewWData extends React.PureComponent<{ userId?: number }> {
//   render() {
//     return (
//       <Query
//         query={GET_POEMS}
//         variables={{
//           offset: 0,
//           authorId: this.props.userId,
//         }}
//         // notifyOnNetworkStatusChange
//         // fetchPolicy="cache-and-network"
//       >
//         {({
//           error,
//           data,
//           loading,
//           fetchMore,
//         }: QueryResult<IGetPoemsResponse, {}>) => {
//           if (loading)
//             return (
//               <PoemContainerDiv>
//                 <div>
//                   <LoadingPoemDiv />
//                   <LoadingPoemDiv />
//                   <LoadingPoemDiv />
//                   <LoadingPoemDiv />
//                   <LoadingPoemDiv />
//                   <LoadingPoemDiv />
//                 </div>
//               </PoemContainerDiv>
//             )
//           if (error) return <p>Error :(</p>
//           if (!data) return <p>Empty</p>

//           return (
//             <IndexView
//               poems={data.poems.items}
//               hasMore={data.poems.hasMore}
//               loadMore={(page) => {
//                 return fetchMore({
//                   variables: {
//                     offset: page * POEM_LIMIT,
//                   },
//                   updateQuery: (prev, { fetchMoreResult }) => {
//                     if (!fetchMoreResult) return prev
//                     if (
//                       (last(prev.poems.items) || ({} as any)).id ===
//                       (last(fetchMoreResult.poems.items) || ({} as any)).id
//                     ) {
//                       return prev // getting double called randomly
//                     }
//                     return Object.assign({}, prev, {
//                       poems: {
//                         ...fetchMoreResult.poems,
//                         items: [
//                           ...prev.poems.items,
//                           ...fetchMoreResult.poems.items,
//                         ],
//                       },
//                     })
//                   },
//                 })
//               }}
//             />
//           )
//         }}
//       </Query>
//     )
//   }
// }
