const PROTOCOL = process.env.API_PROTOCOL
const DOMAIN = process.env.API_DOMAIN 
const API_VERSION = process.env.API_VERSION 

export const buildUrl = (endpoint: string, args?: URLSearchParams) => `${PROTOCOL}://${DOMAIN}/${API_VERSION}${endpoint}${args ? '?' + args : ''}`