export default async function Page({ params }) {
    const { email } = params

    const response = await fetch(`http://localhost:3003/externalapi/photos?album.user.email=${email}`)
    const data = await response.json()
    
    return (
        <div>
            { data.map(photo => (
                <a href={`/photos/${photo.id}`}>
                    <img src={photo.thumbnailUrl} />
                </a>
            )) }
        </div>
    )
}