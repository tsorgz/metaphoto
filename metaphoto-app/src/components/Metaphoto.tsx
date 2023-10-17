"use client"
import { useState, useEffect, useRef } from "react";
import { setupObserver } from "@/utils/setupObserver";
import Search from "./Search";
import Photo from "./Photo";

import "@/styles/Metaphoto.css"
import { buildUrl } from "@/utils/buildUrl";

export default function Metaphoto() {

    const [photos, setPhotos]: [any[], any] = useState([])
    const [page, setPage] = useState(0)
    const [searchParams, setSearchParams] = useState(new URLSearchParams())
    const [end, setEnd] = useState(false)

    const observer = useRef()
    const lastItemRef = setupObserver(observer, page, setPage)

    const returnSearchParameters = async (params: URLSearchParams, isNewSearch: boolean) => {
        if (!isNewSearch && page > 0) {
            params.set("offset", (page * 25).toString())
        }
        setSearchParams(params)
        const url = buildUrl('/photos', params)
        const response = await fetch(url)
        const data: any[] = await response.json()
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