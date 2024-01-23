const Genre = require('./Genre')
const Actor = require('./Actor')
const Director = require('./Director')
const Movie = require('./Movie')

Actor.belongsToMany(Movie, {through: 'ActorsMovies'})
Movie.belongsToMany(Actor, {through: 'ActorsMovies'})

Genre.belongsToMany(Movie, {through: 'GenresMovies'})
Movie.belongsToMany(Genre, {through: 'GenresMovies'})

Director.belongsToMany(Movie, {through: 'DirectosMovies'})
Movie.belongsToMany(Director, {through: 'DirectosMovies'})

Actor.belongsToMany(Genre, {through: 'ActorsGenres'})
Genre.belongsToMany(Actor, {through: 'ActorsGenres'})