var request = require('request')
var tar = require('tar-stream').extract
var unzip = require('zlib').createUnzip
var File = require('vinyl')
var Readable = require('readable-stream').Readable
var package = require('./package.json')
var path = require('path')

function getTarball(repo) {
  var url = 'https://api.github.com/repos/' + repo + '/tarball/master'

  var first = true

  return request({
    url: url,
    headers: {
      'user-agent': package.name + '/'+package.version
    }
  })
  .pipe(unzip())
  .pipe(tar())

}

function GithubSrc (repo, opt) {
  opt = opt || {}
  opt.ref = opt.ref || 'master'
  var stream = new Readable({objectMode: true})
  stream._read = function () {}

  var ref = opt.ref
  var first = false
  
  getTarball(repo)
    .on('ref', function (r) {
      ref = r
      stream.ref = r
    })
    .on('error', stream.emit.bind(stream, 'error'))
    .on('entry', function (header, contents, next) {
      if (header.type !== 'file') { return next() }
      
      if (first) {
        first = false
        ref = header.name.match(/-([a-f0-9]{7})\/$/)[1]
      }

      var filePath = header.name.substr(header.name.indexOf('/'))

      var file = new File({
        cwd: '/',
        base: path.dirname(filePath),
        path: filePath,
        contents: contents
      })

      contents.on('end', function () {
        next()
      })

      file.ref = ref
      stream.push(file)
    })
    .on('finish', function () {
      stream.push(null)
    })

  return stream

}

module.exports = GithubSrc
