const PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL
const DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN 
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION 

export const buildUrl = (endpoint: string, args?: URLSearchParams) => `${PROTOCOL}://${DOMAIN}/${API_VERSION}${endpoint}${args ? '?' + args : ''}`