import React, { useState } from "react"
import { useParams } from "react-router-dom"
import StyleToolbar from "src/components/selectable/StyleToolbar"
import Poem from "src/components/poem/Poem"
import Loader from "../universal/Loader"
import { useGetSinglePoemQuery } from "src/queries/autogenerate/hooks"

export default function StyleView() {
  const { id } = useParams()
  const { data } = useGetSinglePoemQuery({ variables: { id } })
  const [poem, setPoem] = useState(data && data.poem)
  if (!poem) return <Loader />

  const updateStyle = ({
    backgroundId,
    colorRange,
  }: {
    backgroundId: number
    colorRange: number
  }) => {
    backgroundId && setPoem({ ...poem, backgroundId })
    colorRange && setPoem({ ...poem, colorRange })
  }

  return (
    <div className="close-up-poem-view text-center">
      <h1>Stylize</h1>
      <StyleToolbar {...{ poem, updateStyle }} />
      <Poem poem={poem} closeUp />
    </div>
  )
}
