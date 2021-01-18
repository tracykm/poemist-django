import React from "react"
import IndexView from "src/components/manyPoemViews/IndexView"
import { useGetPoemsQuery } from "src/queries/autogenerate/hooks"

export default function HomeView() {
  const { data, loading } = useGetPoemsQuery()
  if (loading) {
    return "loading"
  }
  return (
    <div className="index-view">
      <h5>Browse through all the communities poems!</h5>
      <IndexView {...{ poems: data.poems }} />
    </div>
  )
}
