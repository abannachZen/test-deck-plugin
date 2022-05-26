# Test Deck Plugin

This repo is intended to be used to reproduce errors when writing deck plugins.

## Issues

* EcmaScript module packaging :white_check_mark: (:warning: workaround)
    * When upgrading `@spinnaker/*@ >= 0.0.595` the packaging changed from CommonJS to EcmaScript.
      Causing [Jest] to no longer be able to resolve the `@spinnaker/*` dependencies.
    * The workaround for this is to no longer use [Jest], but to pull in [Karma] + [Jasmine]
    * This workaround is not ideal as it changes how we do work, but it allows us to continue
      testing.
* Circular dependency
    * [Webpack] 5 identifies and breaks on circular dependencies.
    * `@spinnaker` depends on `react-virtualized` which after an update to better use types
      introduced a lot of circular dependencies. See [react-virtualized#1308]
      and [react-virtualized#1494]
    * The version that introduced the issue is significantly older than the requested version.
    * [spinnaker/deck] uses [Webpack] 4 so they are not seeing this issue. Which says the workaround
      is to rollback to [Webpack] 4 

## To Reproduce

| Step | Description          | Command                                                         |
|------|----------------------|-----------------------------------------------------------------|
| 1    | Clone repo           | `git clone https://github.com/abannachZen/test-deck-plugin.git` |
| 2    | Install dependencies | `yarn`                                                          |
| 3    | Run tests            | `yarn test`                                                     |

[Jasmine]: https://jasmine.github.io/index.html

[Jest]: https://jestjs.io/

[Karma]: https://karma-runner.github.io/latest/index.html

[react-virtualized#1308]: https://github.com/bvaughn/react-virtualized/issues/1308

[react-virtualized#1494]: https://github.com/bvaughn/react-virtualized/issues/1494

[spinnaker/deck]: https://github.com/spinnaker/deck

[Webpack]: https://webpack.js.org/
