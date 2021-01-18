import React from "react"
import Poem from "src/components/poem/Poem"
import CloseUpPoemDiv from "src/components/poem/CloseUpPoemDiv"
import Loader from "../universal/Loader"
import { useGetSinglePoemQuery } from "../../queries/autogenerate/hooks"
import { useParams } from "react-router-dom"

export default function CloseUpPoemView() {
  let { id } = useParams()
  const { data, loading } = useGetSinglePoemQuery({
    variables: {
      id,
    },
  })
  if (loading) return <Loader />
  return (
    <CloseUpPoemDiv>
      <Poem poem={data.poem} closeUp />
    </CloseUpPoemDiv>
  )
}
