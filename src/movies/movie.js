function getTypeFromExtension (ext) {
  switch (ext) {
    case 'mpe':
      return 'video/mpeg'
    case 'mpeg':
      return 'video/mpeg'
    case 'mpg':
      return 'video/mpeg'
    case 'mp4':
      return 'video/mp4'
    case 'mov':
      return 'video/quicktime'
    case 'asf':
      return 'video/x-ms-asf'
    case 'asr':
      return 'video/x-ms-asf'
    case 'asx':
      return 'video/x-ms-asf'
    case 'avi':
      return 'video/x-msvideo'
    case 'flv':
      return 'video/x-flv'
    case 'mka':
      return 'video/x-matroska'
    case 'mkv':
      return 'video/x-matroska'
    case 'mk3d':
      return 'video/x-matroska-3d'
  }
}

module.exports = class Movie {
  constructor (id, extension) {
    this.id = id
    this.extension = extension
    this.type = getTypeFromExtension(extension)
  }
}
