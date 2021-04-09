const tmdb = require('../api/tmdb');
const Movie = require('../models/Movie');

const movieController = {
    create(req, res){
        const {
            movie_id,
            efdb_point,
            efdb_comment,
            efdb_youtube
        } = req.body;

        tmdb.get(`/movie/${movie_id}`, {
            params: {
                language: 'tr-TR'
            }
        })
            .then(({ data }) => {
                const newMovie = {
                    movie_id,
                    title: data.title,
                    original_title: data.original_title,
                    budget: data.budget,
                    language: data.original_language,
                    overview: data.overview,
                    poster_path: data.poster_path,
                    production_companies: data.production_companies,
                    production_countries: data.production_countries,
                    release_date: data.release_date,
                    revenue: data.revenue,
                    runtime: data.runtime,
                    vote_average: data.vote_average,
                    imdb_id: data.imdb_id,
                    efdb_comment,
                    efdb_point,
                    efdb_youtube,
                };

                const movie = new Movie(newMovie);
                movie.save()
                    .then((movie) => {
                        res.status(201).json(movie);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(404).send("Movie doesn't save.")
                    });
            })
            .catch((err) => {
                console.log(err)
                res.status(404).send("Movie not found.")
            });
    },
    search(req, res) {
        const { search } = req.body;

        tmdb.get('/search/movie', {
            params: {
                language: 'tr-TR',
                query: search
            }
        })
            .then(({ data }) => {
                res.status(200).json(data.results);
            })
            .catch(err => console.log(err))
    },
    get(req, res){
      const movieId = req.params.movie_id;

        tmdb.get(`/movie/${movieId}`, {
            params: {
                language: 'tr-TR'
            }
        })
            .then(({ data }) => {
                res.status(200).json(data);
            })
            .catch(err => res.status(501).json(err))
    },
    getAllMovies(req, res){
        Movie.aggregate([
            { $match: {}},
            {$project: { movie_id: 1, title: 1, efdb_point: 1, poster_path: 1}}
        ])
            .then(data => {
                res.status(200).json(data);
            })
    },
    getLocalMovie(req, res){
        const ObjectId = require('mongoose').Types.ObjectId;
        const { objectId } = req.params;

        Movie.find({ "_id" : ObjectId(objectId) })
            .then((movie) => {
                res.status(200).json(movie);
            })
            .catch(err => {
                res.status(404).json({errMsg: "Movie not found!"})
            })
    },
};

module.exports = movieController;