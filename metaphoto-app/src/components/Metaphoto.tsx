"use client"
import { useState, useEffect } from "react";
import Search from "./Search";
import Photo from "./Photo";

import "@/styles/Metaphoto.css"

export default function Metaphoto() {

    const [photos, setPhotos] = useState([])
    const [page, setPage] = useState(0)
    const [searchParams, setSearchParams] = useState(new URLSearchParams())

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
        } else {
            setPhotos(photos.concat(data))
        }
    }

    useEffect(() => {
        if (page > 0) {
            returnSearchParameters(searchParams, false)
        }
    }, [page])

    return (
        <div class="metaphoto--stage">
            <Search resultsCallback={returnSearchParameters} />
            <div className="photo--layout">
                { 
                    photos.map(photo => <Photo data={photo} />)
                }
            </div>
            <button onClick={() => setPage(page + 1)}>Load More</button>
        </div>
    )
}