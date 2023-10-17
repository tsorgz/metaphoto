'use client'
import { useEffect, useState, useRef } from 'react'
import { setupObserver } from '@/utils/setupObserver'
import '@/styles/PhotoGrid.css'
import { buildUrl } from '@/utils/buildUrl'

export default function PhotoGrid(props: {url: string, urlParams: URLSearchParams}) {

    const { url, urlParams } = props

    const [page, setPage] = useState(0)
    const [photos, setPhotos]: [any[], any] = useState([])
    const [end, setEnd] = useState(false)

    const observer = useRef()
    const lastItemRef = setupObserver(observer, page, setPage)

    const returnSearchParameters = async (params: URLSearchParams) => {
        params.set("limit", "30")
        if (page > 0) {
            params.set("offset", (page * 30).toString())
        }
        const requestUrl = buildUrl(url, params)
        const response = await fetch(requestUrl)
        const data: any[] = await response.json()
        if(!data.length) setEnd(true)
        setPhotos([...photos, ...data])
    }

    useEffect(() => {
        if(!end) returnSearchParameters(new URLSearchParams(urlParams))
    }, [page])


    return (
        <div className="photo--grid">
            { photos.map((photo, idx) => (photos.length - 3 === idx) ? 
                (
                    <a key={photo.id} href={`/photos/${photo.id}`} className="photo--grid-item">
                        <img src={photo.thumbnailUrl} className='photo--grid-thumbnail'/>
                    </a>
                ) : (
                    <a ref={lastItemRef} key={photo.id} href={`/photos/${photo.id}`} className="photo--grid-item">
                        <img src={photo.thumbnailUrl} className='photo--grid-thumbnail'/>
                    </a>
                ))
            }
        </div>
    )
}