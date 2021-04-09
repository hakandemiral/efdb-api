const { model, Schema } = require('mongoose');

const MovieSchema = new Schema({
    movie_id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
      type: String,
      required: true
    },
    budget: Number,
    original_title: String,
    language: String,
    overview: String,
    poster_path: String,
    production_companies: [{
        id: Number,
        logo_path: String,
        name: String,
        origin_country: String,
    }],
    production_countries: [{
        code: String,
        name: String,
    }],
    release_date: String,
    revenue: Number,
    runtime: Number,
    vote_average: Number,
    imdb_id: String,
    efdb_comment: String,
    efdb_point: Number,
    efdb_youtube: String,
});

module.exports = model('Movie', MovieSchema)