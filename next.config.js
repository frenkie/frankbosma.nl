module.exports = {
    env: {
        NEXT_PUBLIC_STATIC: process.env.STATIC === 'true',
        // for fetching static data / images instead of Strapi content
        // Prerequisite is that images and data (as referenced in the below file) are available in the /public folder

        NEXT_PUBLIC_DATA_PATH: '/data/20230126-home.json', // will be fetched client side
        NEXT_PUBLIC_DATA_PATH_RESUME: '/data/20230126-resume.json' // will be fetched client side
    }
};