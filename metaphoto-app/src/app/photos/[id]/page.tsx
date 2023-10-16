import Photo from "@/components/Photo"

export default async function Page({ params }) {
    const { id } = params

    const response = await fetch(`http://localhost:3003/externalapi/photos/${id}`)
    const data = await response.json()
    
    return (
       <Photo data={data} />
    )
}