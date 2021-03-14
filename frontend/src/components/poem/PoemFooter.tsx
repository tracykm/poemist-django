import UsernameLink from "src/components/universal/UsernameLink"

export default function PoemFooter({
  authorUsername,
  authorId,
}: {
  authorUsername?: string
  authorId: string
}) {
  return (
    <div className="poem-footer">
      <UsernameLink userId={authorId} username={authorUsername} />
    </div>
  )
}
