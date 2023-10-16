import '@/styles/Photo.css'

export default function Photo(props: { data: any, innerRef?: React.Ref<HTMLDivElement>}) {

    const { data, innerRef } = props

    const { id, url, thumbnailUrl, title, album} = data
    const { user, title: albumTitle } = album
    const { username, email } = user


    return (
        <div className="photo--stage" ref={innerRef}>
            <div className="photo--user">
                <img src={thumbnailUrl} className="photo--thumbnail"/>
                <div className='photo--userdata'>
                    <a href={`/users/${email}`} className="photo--author">{username}</a>
                    <a href={`/albums/${albumTitle}`} className="photo--album">{albumTitle}</a>
                </div>
            </div>
            <a href={`/photos/${id}`}>
                <img src={url} className='photo--photo'/>
            </a>
            <div className="photo--metadata">
                <p className="photo--title">
                    <a href={`/users/${email}`} className="photo--username">{username}</a>
                    {` ${title}`}
                </p>
            </div>
        </div>
    )
}