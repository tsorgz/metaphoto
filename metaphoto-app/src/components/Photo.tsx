export default function Photo(props: { data: any}) {

    const { data } = props
    return (
        <a href={`/photos/${data.id}`}>
            <img src={data.thumbnailUrl} />
            <p>{data.id}</p>
        </a>
    )
}