/** @type {import('next').NextConfig} */


const nextConfig = {
    images: {
        domains: ["localhost", "res.cloudinary.com", "images.unsplash.com"],
    },
    turbo: {
        enabled : true 
    }
};

module.exports = nextConfig;
