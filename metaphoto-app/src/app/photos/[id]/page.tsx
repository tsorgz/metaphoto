export default async function Page({ params }) {
    const { id } = params
    // const [data, setData] = useState({})

    const response = await fetch(`http://localhost:3003/externalapi/photos/${id}`)
    const data = await response.json()
    
    const { url, title, album} = data
    const { user } = album
    const { name, email } = user
    
    return (
        <div>
            <img src={url} />
            <p>{title}</p>
            <p>{name}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}