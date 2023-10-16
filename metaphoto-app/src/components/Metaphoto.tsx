"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import Search from "./Search";
import Photo from "./Photo";

import "@/styles/Metaphoto.css"

export default function Metaphoto() {

    const [photos, setPhotos] = useState([])
    const [page, setPage] = useState(0)
    const [searchParams, setSearchParams] = useState(new URLSearchParams())
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

    const returnSearchParameters = async (params: URLSearchParams, isNewSearch: boolean) => {
        if (!isNewSearch && page > 0) {
            params.set("offset", (page * 25).toString())
        }
        setSearchParams(params)
        const response = await fetch(`http://localhost:3003/externalapi/photos?${params}`)
        const data = await response.json()
        if (isNewSearch) {
            setPhotos(data)
            setPage(0)
            setEnd(false)
        } else {
            setPhotos([...photos, ...data])
        }
        if (!data.length) setEnd(true)
    }

    useEffect(() => {
        if (end) return
        if (page > 0) {
            returnSearchParameters(searchParams, false)
        }
    }, [page])

    return (
        <div>
            <Search resultsCallback={returnSearchParameters} />
            <div className="photo--layout">
                { 
                    photos.map((photo, idx) => (photos.length - 5) === idx ? <Photo innerRef={lastItemRef} key={idx} data={photo} /> : <Photo key={idx} data={photo} />)
                }
            </div>
        </div>
    )
}