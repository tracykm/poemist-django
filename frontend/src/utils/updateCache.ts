import { ApolloCache, DocumentNode } from "@apollo/client"

export default function updateCache<D extends Record<any, any>>({
  cache,
  arg,
  updateData,
}: {
  cache: ApolloCache<any>
  arg: { variables: Record<string, any>; query: DocumentNode }
  updateData: (data: D) => D
}) {
  const data: D = cache.readQuery(arg)
  if (!data) return // if page not visited
  const newData = updateData(data)
  cache.writeQuery({
    ...arg,
    data: newData,
  })
}
