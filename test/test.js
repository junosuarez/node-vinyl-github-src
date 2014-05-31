var chai = require('chai')
chai.should()
var vinylFs = require('vinyl-fs')
var rimraf = require('rimraf')

describe('vinyl-github-src', function () {
  var vinylGithubSrc = require('../')


  afterEach(function (done) {
    rimraf('./test/testdest/*', done)
  })
  
  it('reads files from github', function (done) {
    this.timeout(20000)
    vinylGithubSrc('jden/gtfs')
      .on('data', function (file) {
        file.contents.resume()
      })
      .on('end', function () {
        done()
      })
  })

  it('emits a vinyl src stream', function (done) {
    this.timeout(20000)
    
    var out = vinylGithubSrc('jden/gtfs')
      .pipe(vinylFs.dest('./test/testdest'))
      .on('close', function () {
        done()
      })

  })
})