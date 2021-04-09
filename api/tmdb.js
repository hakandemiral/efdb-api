const { create } = require('axios');

const tmdb = create({
    baseURL: 'https://api.themoviedb.org/3',
})

tmdb.interceptors.request.use(config => {
    config.params = {
        api_key: process.env.TMDB_API_KEY,
        ...config.params,
    };
    return config;
});

module.exports = tmdb;