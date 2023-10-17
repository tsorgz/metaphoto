import { buildUrl } from "@/utils/buildUrl"
import PhotoGrid from "@/components/PhotoGrid"
import './page.css'

export default async function Page({ params }: any) {
    const { title } = params
    const formattedTitle = decodeURI(title).replaceAll("+", " ")

    const urlParams = new URLSearchParams({"album.title": formattedTitle, "limit": "1"})
    const url = buildUrl("/photos", urlParams)
    const response = await fetch(url)
    const data = await response.json()
    
    const albumData = data.length ? data[0].album.title : "This album doesn't exist"

    urlParams.delete("limit")

    return (
        <div>
            <h2 className='album--title'>{albumData}</h2>
            <PhotoGrid url="/photos" urlParams={urlParams} />
        </div>
    )
}