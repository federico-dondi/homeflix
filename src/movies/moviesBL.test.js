/* eslint-env jest */

const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const {
  readMovie,
  readMovies,
  createMovie
} = require('./moviesBL')

describe('Movies', () => {
  it('READ a movie (existing)', () => {
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

  it('CREATE a movie', async () => {
    const data = await createMovie({
      mv: async function (path) {

      },
      name: '42.avi',
      mimetype: 'video/x-msvideo'
    })

    expect(data.id).toBeDefined()
    expect(data.id).toBe(42)
    expect(data.extension).toBeDefined()
    expect(data.extension).toBe('avi')
    expect(data.type).toBeDefined()
    expect(data.type).toBe('video/x-msvideo')
  })

  it('CREATE a movie (identifier not valid)', async () => {
    await expect(createMovie({
      mv: async function (path) {

      },
      name: 'sample.avi',
      mimetype: 'video/x-msvideo'
    })).rejects.toThrowError('Identifier not valid.')
  })

  it('CREATE a movie (identifier not unique)', async () => {
    await expect(createMovie({
      mv: async function (path) {

      },
      name: '42.avi',
      mimetype: 'video/x-msvideo'
    })).rejects.toThrowError('Identifier not unique.')
  })
})
