# vinyl-github-src
use github repos as a vinyl (gulp) source

## usage
```js
var githubSrc = require('vinyl-github-src')
var vinylFs = require('vinyl-fs')

  githubSrc('jden/node-vinyl-github-src')
    .pipe(vinylFs.dest('./repo'))
```
Downloads a this module's repository to the `./repo` directory

Usage with [`gulp`](https://npm.im/gulp) is similar:

```js
var gulp = require('gulp')
var githubSrc = require('vinyl-github-src')

githubSrc('jden/node-vinyl-github-src')
  .pipe(gulp.dest('./repo'))
```

## api

### `vinylGithubSrc(repo: String, opts?: Object) => VinylSourceStream`

`repo` should be a string like `username/repo`

`opts` is an options object with any of the following keys:

- `opts.ref` - the git reference to use (branch, tag, or commit hash). defaults to `"master"`


## installation

    $ npm install vinyl-github-src


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
