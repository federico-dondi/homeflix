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

module.exports.createMovie = async function (file) {
  const name = file.name.split('.')[0]
  const extension = file.name.split('.')[1]

  const id = parseInt(name)

  if (Number.isNaN(id)) throw new Error('Identifier not valid.')
  if (id === Number.POSITIVE_INFINITY) throw new Error('Identifier not valid.')
  if (id === Number.NEGATIVE_INFINITY) throw new Error('Identifier not valid.')
  if (id < 0) throw new Error('Identifier not valid.')
  if (movies[id]) throw new Error('Identifier not unique.')

  await file.mv(process.env.MOVIES_PATH + `${name}.${extension}`)

  return movies[id] = new Movie(
    id,
    extension
  )
}
