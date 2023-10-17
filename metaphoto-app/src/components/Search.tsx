import { useState, useEffect } from "react";
import SearchChip from "./SearchChip";
import '@/styles/Search.css'

export default function Search(props: { resultsCallback: CallableFunction}) {

    const [titleSearch, setTitleSearch] = useState('')
    const [albumSearch, setAlbumSearch] = useState('')
    const [emailSearch, setEmailSearch] = useState('')
    const { resultsCallback } = props

    const isValidEmail = (email: string) => {
        const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        return pattern.test(email)
    }

    useEffect(() => {
        const fetchResults = async () => {
            const urlParams = new URLSearchParams()
            if (titleSearch) {
                urlParams.set('title', titleSearch)
            }

            if (albumSearch) {
                urlParams.set('album.title', albumSearch)
            }

            if (emailSearch && isValidEmail(emailSearch)) {
                urlParams.set('album.user.email', emailSearch)
            }
            resultsCallback(urlParams, true)
        }
        fetchResults()
    }, [titleSearch, albumSearch, emailSearch])

    return (
        <div className="search">
            <div className="search--chips">
                <SearchChip id="title-photo" label="Photo Title" onValid={setTitleSearch} />
                <SearchChip id="title-album" label="Album Title" onValid={setAlbumSearch} />
                <SearchChip id="email-user" label="User Email" onValid={setEmailSearch} validation={isValidEmail} />
            </div> 
        </div>
    )
}