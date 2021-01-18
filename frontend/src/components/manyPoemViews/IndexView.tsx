import React from "react"
import Poem from "src/components/poem/Poem"
import styled from "styled-components"
import { GetPoemsQuery } from "src/queries/autogenerate/operations"

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
  > div {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;
    text-align: center;
    margin-left: -2rem;
    margin-right: -2rem;
  }
`

export default function IndexView({
  poems,
  hasMore,
  loadMore,
}: {
  poems: GetPoemsQuery["poems"]
  hasMore?: boolean
  loadMore?: (page: number) => Promise<any>
}) {
  return (
    <PoemContainerDiv>
      {/* <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<Loader key="loader" />}
      > */}
      {poems &&
        poems.map((poem) => {
          return <Poem poem={poem} key={poem.id} />
        })}
      {/* </InfiniteScroll> */}
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
