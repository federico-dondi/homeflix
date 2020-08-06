const fs = require('fs')
const path = require('path')

const Movie = require('./movie')

const movies = { }
const moviesPath = process.env.MOVIES_PATH

fs.readdirSync(moviesPath).forEach((f) => {
  const name = f.split('.')[0]
  const extension = f.split('.')[1]

  const id = parseInt(name)

  if (id) movies[id] = new Movie(id, extension)
})

module.exports.readMovies = function () {
  return movies
}

module.exports.readMovie = function (id) {
  return movies[id]
}
