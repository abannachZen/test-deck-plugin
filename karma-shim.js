import jQuery from 'jquery'
import JasmineDOM from '@testing-library/jasmine-dom'

global.$ = global.jQuery = jQuery
Error.stackTraceLimit = Infinity

beforeAll(() => {
  jasmine.getEnv().addMatchers(JasmineDOM)
})

let testContext

testContext = require.context('./src', true, /\.(spec|test)\.(ts|js)x?$/)
testContext.keys().forEach(testContext)

testContext = require.context('./tests', true, /\.(spec|test)\.(ts|js)x?$/)
testContext.keys().forEach(testContext)

// const buildContextFromPaths = (...paths) => {
//   paths.forEach(path => {
//     testContext = require.context(path, true, /\.(spec|test)\.(ts|js)x?$/)
//     testContext.keys().forEach(testContext)
//   })
// }
// buildContextFromPaths('./src', './tests')