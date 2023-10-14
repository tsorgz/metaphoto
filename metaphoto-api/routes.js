import * as https from 'https'
import fetch from 'node-fetch'

export default async (fastify, options) => {

    fastify.get("/photos", async (req, res) => {

        const { 
            title: titleFilter, 
            ["album.title"]: albumTitleFilter,
            ["album.user.email"]: albumUserEmailFilter,
            offset = "0",
            limit = "25"
        } = req.query

        const userRes = await fetch('https://jsonplaceholder.typicode.com/users')
        const userData = await userRes.json()
        const qualifyingUsers = albumUserEmailFilter ? userData.filter(user => user.email === albumUserEmailFilter) : userData
        const qualifyingUserIds = Object.fromEntries(qualifyingUsers.map(user => [user.id, user]))

        const albumRes = await fetch('https://jsonplaceholder.typicode.com/albums')
        const albumData = await albumRes.json()
        const qualifyingAlbums = albumData.filter(album => album.userId in qualifyingUserIds && (albumTitleFilter ? album.title.includes(albumTitleFilter) : true))
        const qualifyingAlbumIds = Object.fromEntries(qualifyingAlbums.map(album => [album.id, album]))

        Object.values(qualifyingAlbumIds).forEach(album => {
            const { userId } = album
            const user = qualifyingUserIds[userId]
            album.user = user
            delete album.userId
        })

        const photoRes = await fetch('https://jsonplaceholder.typicode.com/photos')
        const photoData = await photoRes.json()
        let qualifyingPhotos = photoData.filter(photo => photo.albumId in qualifyingAlbumIds && (titleFilter ? photo.title.includes(titleFilter) : true))

        qualifyingPhotos.forEach(photo => {
            const { albumId } = photo
            const album = qualifyingAlbumIds[albumId]
            photo.album = album
            delete photo.albumId
        })
        
        const convertedLimit = parseInt(limit)
        const convertedOffset = parseInt(offset)
        return qualifyingPhotos.slice(convertedOffset, convertedLimit + convertedOffset)
    })

    fastify.get("/photos/:photoId", async (req, res) => {
        
        const { photoId } = req.params
        const photoRes = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
        const photoData = await photoRes.json()
        
        const { albumId } = photoData
        const albumRes = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
        const albumData = await albumRes.json()
        
        const { userId } = albumData
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        const userData = await userRes.json()
        
        delete albumData['userId']
        albumData['user'] = userData

        delete photoData['albumId']
        photoData['album'] = albumData

        return photoData
    })

}