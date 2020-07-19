module.exports = {
    env: {
        NEXT_PUBLIC_STATIC: process.env.STATIC === 'true',
        // for fetching static data / images instead of Strapi content
        // Prerequisite is that images and data are available in the /public folder

        NEXT_PUBLIC_DATA_PATH: '/data/20200719-home.json' // will be fetched client side
    }
};