import PhotoGrid from "@/components/PhotoGrid"
import { stringify } from "querystring"
import './page.css'

export default async function Page({ params }) {
    const { email } = params
    const formattedEmail = decodeURI(email)

    const url = `http://localhost:3003/externalapi/photos?`
    const urlParams = new URLSearchParams({"album.user.email": formattedEmail, "limit": "1"})
    const response = await fetch(url + urlParams)
    const data = await response.json()

    const firstPhotoData = data.length ? data[0] : undefined

    if (!firstPhotoData) {
        return <p>This user does not have any posts</p>
    }

    const userData = firstPhotoData ? firstPhotoData.album.user : undefined

    const { thumbnailUrl } = firstPhotoData
    const { username, name, phone, website } =  userData

    urlParams.delete("limit")
    
    return (
        <div>
            <div className="profile--section">
                <div className="profile--header">
                    <img src={thumbnailUrl} className='profile--thumbnail'/>
                    <h2 className='profile--username'>{username}</h2>
                </div>
                <p className="profile--name">{name}</p>
                <p className="profile--phone">{phone}</p>
                <a href={website} className='profile--website'>{website}</a>
            </div>
            <PhotoGrid url={url} urlParams={urlParams}/>
        </div>
    )
}