export default function Page({ params }: { params: { id: number } }) {
  return <p>this is Block page, UserId: {params.id}</p>
}
