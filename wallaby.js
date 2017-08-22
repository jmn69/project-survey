module.exports = wallaby => {
  process.env.NODE_ENV = 'test'
  const next = require('postcss-cssnext')
  const modules = require('postcss-modules')
  const postcss = require('postcss')
  const processCss = function(file, done) {
    postcss([
      next,
      modules({
        getJSON: function(filename, json) {
          file.rename(file.path + '.json')
          done(JSON.stringify(json))
        }
      })
    ]).process(file.content, {
      from: file.path,
      to: file.path
    }).catch(function(err) {
      throw err
    })
  }

  return {
    files: [
      { pattern: 'client/**/*.js*', load: false },
      'client/**/*.css'
    ],

    tests: ['__tests__/**/*.jsx', '__tests__/**/*.js'],

    preprocessors: {
      'client/**/*.css': processCss,
    },

    lowCoverageThreshold: 85,

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',
    compilers: {
      '**/*.js*': wallaby.compilers.babel({ babelrc: true })
    },
    setup(wallaby) {
      const conf = require('./package.json').jest
      wallaby.testFramework.configure(conf)
    },
    // runAllTestsInAffectedTestFile: true,
    // runAllTestsInAffectedTestGroup: true,
    debug: false
  }
}