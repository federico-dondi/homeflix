const fs = require('fs')
const path = require('path')

const express = require('express')

const {
  readMovie,
  readMovies
} = require('./moviesBL')

const router = express.Router()

router.route('/')
  .get(async (req, res) => {
    const data = readMovies()

    res.status(200).json({
      status: 200,
      message: 'Ok.',
      data
    })
  })

router.route('/:id')
  .get(async (req, res) => {
    const data = readMovie(req.params.id)

    if (data) {
      res.status(200).json({
        status: 200,
        message: 'Ok.',
        data
      })
    } else {
      res.status(404).json({
        status: 404,
        message: 'Not found.',
        data: undefined
      })
    }
  })

router.route('/:id/stream')
  .get(async (req, res) => {
    const { id } = req.params
    const { range } = req.headers

    const movie = readMovie(id)

    const {
      extension,
      type
    } = movie

    const directory = path.join(process.env.MOVIES_PATH, `${id}.${extension}`)
    const statistics = fs.statSync(directory)
    const fileSize = statistics.size
    const contentType = type

    let start = 0
    let end = fileSize - 1

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')

      start = parseInt(parts[0], 10)
      end = parseInt(parts[1], 10)

      const chuckSize = (end - start) + 1

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chuckSize,
        'Content-Type': contentType
      })

      fs.createReadStream(directory, {
        start,
        end
      }).pipe(res)
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType
      })

      fs.createReadStream(directory).pipe(res)
    }
  })

module.exports = router
