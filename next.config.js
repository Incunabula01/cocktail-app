/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.thecocktaildb.com']
    },
    video: {
        domains: ['www.thecocktaildb.com']
    },
    env: {
        JWT_KEY: process.env.JWT_KEY
    }
}

module.exports = nextConfig
