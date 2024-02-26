export default function Page({ params }: { params: { id: number } }) {
  return (
    <>
      <p>{params.id}</p>
    </>
  )
}
