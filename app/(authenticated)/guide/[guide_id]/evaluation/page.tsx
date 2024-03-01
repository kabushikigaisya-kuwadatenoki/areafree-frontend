export default function Page({ params }: { params: { guide_id: string } }) {
  return (
    <>
      <p>{params.guide_id}</p>
    </>
  )
}
