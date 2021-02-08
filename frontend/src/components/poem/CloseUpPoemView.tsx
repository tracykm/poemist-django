import React from "react"
import Poem from "src/components/poem/Poem"
import CloseUpPoemDiv from "src/components/poem/CloseUpPoemDiv"
import Loader from "../universal/Loader"
import { useGetSinglePoemQuery } from "../../queries/autogenerate/hooks"
import { useParams } from "react-router-dom"

export default function CloseUpPoemView() {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetSinglePoemQuery({
    variables: {
      id,
    },
  })
  if (!data?.poem) return <Loader />
  return (
    <CloseUpPoemDiv style={{ marginTop: 50 }}>
      <Poem poem={data.poem} closeUp />
    </CloseUpPoemDiv>
  )
}
