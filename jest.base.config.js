const path = require('path')

/** @type { import("@jest/types").Config.InitialOptions } */
module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.[jt]{s,sx}'],
  coverageDirectory: '<rootDir>/coverage',
  moduleDirectories: [
    path.resolve(__dirname, "node_modules"),
    '<rootDir>/node_modules',
    '<rootDir>/src'
  ],
  moduleNameMapper: {
    "^.+\\.css$": "jest-transform-stub",
    "@uirouter/rx": "jest-transform-stub",
    "angulartics": "jest-transform-stub",
    "root/version.json": "jest-transform-stub",
    "src/(.*)": "<rootDir>/src/$1"
  },
  testEnvironment: 'jest-environment-jsdom',
  testURL: 'http://localhost/',
  transform: {
    ".+\\.(js|jsx|ts|tsx)$": ["babel-jest",
      {configFile: path.resolve(__dirname, "babel.config.js")}],
    ".+\\.(less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  }
}
