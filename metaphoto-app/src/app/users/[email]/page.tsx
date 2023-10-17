import PhotoGrid from "@/components/PhotoGrid"
import './page.css'
import { buildUrl } from "@/utils/buildUrl"

export default async function Page({ params }: any) {
    const { email } = params
    const formattedEmail = email.replace('%40', '@')

    const urlParams = new URLSearchParams({"album.user.email": formattedEmail, "limit": "1"})
    const url = buildUrl('/photos', urlParams)
    const response = await fetch(url)
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
            <PhotoGrid url="/photos" urlParams={urlParams}/>
        </div>
    )
}