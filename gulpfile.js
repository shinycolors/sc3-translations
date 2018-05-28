const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const seq = require('gulp-sequence')
const jsonlint = require('gulp-jsonlint')
const glob = require('glob')
const Promise = require('bluebird')

gulp.task('checks', seq(['jsonlint', 'dupes']))

gulp.task('jsonlint', function() {
  return gulp.src('./!(node_modules)/**/*.json')
  .pipe(jsonlint())
  .pipe(jsonlint.reporter())
})

gulp.task('dupes', function(done) {
  glob('./!(package.json|package-lock.json|node_modules)', function (err, files) {
    let localeDirs = files.filter(entry => {
      return fs.statSync(entry).isDirectory()
    })
    let localeChecks = localeDirs.map(localeDir => {
      return checkDupesInLang(localeDir)
    })
    Promise.all(localeChecks).catch(done).then(function(results){
      done()
    })
  })
})

function checkDupesInLang(localeDir) {
  return new Promise((resolve, reject) => {
    let allQuotes = {}
    glob(localeDir+'/**/*.json', function (err, files) {
      files.forEach(file => {
        let contents = require(file)
        contents.messages.forEach(quote => {
          if (Object.keys(allQuotes).indexOf(quote.jp) > -1) {
            console.error('Duplicate quote found', file, quote.jp.replace('\r\n', ''), 'already in', allQuotes[quote.jp])
          } else {
            allQuotes[quote.jp] = file
          }
        })
      })
      resolve(files)
    })
  })
}
