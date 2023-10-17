import Photo from "@/components/Photo"
import { buildUrl } from "@/utils/buildUrl"

export default async function Page({ params }: any) {
    const { id } = params

    const url = buildUrl(`/photos/${id}`)
    const response = await fetch(url)
    const data = await response.json()
    
    return (
       <Photo data={data} />
    )
}