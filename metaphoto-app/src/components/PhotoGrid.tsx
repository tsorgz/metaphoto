'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import '@/styles/PhotoGrid.css'

export default function PhotoGrid(props: {url: string, urlParams: URLSearchParams}) {

    const { url, urlParams } = props

    const [page, setPage] = useState(0)
    const [photos, setPhotos] = useState([])
    const [end, setEnd] = useState(false)

    const throttle = (callback, wait) => {
        let timeout;
        return (...args) => {
            if (!timeout) {
                timeout = setTimeout(() => {
                    callback(...args)
                    timeout = null
                }, wait)
            }
        }
    }

    const observer = useRef()
    const lastItemRef = useCallback( item => {
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(throttle(entries => {
            if (entries[0].isIntersecting) {
                setPage(page + 1)
            }
        }, 500))
        if (item) {
            observer.current.observe(item)
        } 
            
    }, [page])

    const returnSearchParameters = async (params: URLSearchParams) => {
        params.set("limit", "30")
        if (page > 0) {
            params.set("offset", (page * 30).toString())
        }
        const response = await fetch(`${url}${params}`)
        const data = await response.json()
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