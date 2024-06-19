/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            protocol:'https',
            hostname:'flagcdn.com'
        }]

    },
    env: {
        // API_URL:'http://localhost:8000/api'
        API_URL:'https://instafarms-14ba5.el.r.appspot.com/api'
    },
}

module.exports = nextConfig
