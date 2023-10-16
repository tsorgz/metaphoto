import PhotoGrid from "@/components/PhotoGrid"
import './page.css'
export default async function Page({ params }) {
    const { title } = params
    const formattedTitle = decodeURI(title).replaceAll("+", " ")
    console.log(formattedTitle)

    const url = `http://localhost:3003/externalapi/photos?`
    const urlParams = new URLSearchParams({"album.title": formattedTitle, "limit": "1"})
    const response = await fetch(url + urlParams)
    const data = await response.json()
    console.log(url+urlParams)
    
    const albumData = data.length ? data[0].album.title : "This album doesn't exist"

    urlParams.delete("limit")

    return (
        <div>
            <h2 className='album--title'>{albumData}</h2>
            <PhotoGrid url={url} urlParams={urlParams} />
        </div>
    )
}