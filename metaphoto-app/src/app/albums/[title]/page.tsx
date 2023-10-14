export default async function Page({ params }) {
    const { title } = params

    const response = await fetch(`http://localhost:3003/externalapi/photos?album.title=${title}`)
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