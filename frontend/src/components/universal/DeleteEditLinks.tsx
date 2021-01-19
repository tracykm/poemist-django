import { Link } from "react-router-dom"
import React from "react"

export default function DeleteEditLinks({ authorId, poemId }) {
  const isCurrentUser = true
  const deletePoem = (arg: any) => null
  return (
    <span className="delete-edit-links">
      {isCurrentUser && (
        <span>
          <a
            href="#"
            onClick={() =>
              window.confirm("Are you sure you want to delete your poem?") &&
              deletePoem({ variables: { id: poemId } })
            }
          >
            delete
          </a>
          {" / "}
          <Link to={`/edit/write/${poemId}`}>edit</Link>
        </span>
      )}
    </span>
  )
}
