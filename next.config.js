module.exports = {
    env: {
        NEXT_PUBLIC_STATIC: process.env.STATIC === 'true',
        // for fetching static data / images instead of Strapi content
        // Prerequisite is that images and data (as referenced in the below file) are available in the /public folder

        NEXT_PUBLIC_DATA_PATH: '/data/20201117-home.json' // will be fetched client side
    }
};