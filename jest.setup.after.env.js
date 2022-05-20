import '@testing-library/jest-dom/extend-expect'
import $ from 'jquery';
import jestFetchMock from 'jest-fetch-mock'

jestFetchMock.enableMocks()

global.$ = global.jQuery = $;
window.spinnakerSettings = {};