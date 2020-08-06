/* eslint-env jest */

const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const {
  readMovie,
  readMovies
} = require('./moviesBL')

describe('Movies', () => {
  it('READ movie (existing)', () => {
    const id = 272

    const data = readMovie(id)

    expect(data.id).toBeDefined()
    expect(data.id).toBe(id)
    expect(data.extension).toBeDefined()
    expect(data.extension).toBe('mp4')
    expect(data.type).toBeDefined()
    expect(data.type).toBe('video/mp4')
  })

  it('READ movie (not existing)', () => {
    const data = readMovie(0)

    expect(data).toBeUndefined()
  })

  it('READ movies', () => {
    const data = readMovies()

    expect(data).toBeDefined()
    expect(Object.keys(data).length).toBeDefined()
    expect(Object.keys(data).length).toBe(3)

    Object.values(data).forEach(m => {
      expect(m.id).toBeDefined()
      expect(m.extension).toBeDefined()
      expect(m.type).toBeDefined()
    })
  })
})
