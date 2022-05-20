# Test Deck Plugin

This repo is intended to be used to reproduce errors when writing deck plugins.

## Issue

* When attempting to update @spinnaker dependencies to the latest our Jest tests no longer are able
  to find the `@spinnaker/*` modules.

## Notes

* At first I thought it had something to do with using yarn workspaces as I was trying to refactor
  to use them as well as update dependencies in our repo. So I created this repo which was generated
  via `npx -p @spinnaker/pluginsdk scaffold`. I only added our jest config and the additional
  dependencies that our plugin repo included. Turns out it wasn't yarn workspaces fault and now I'm
  stumped.

* Another thing I looked at with this test repo was changing my `moduleDirectories` to be,

```json
{
  "moduleDirectories": [
    "node_modules",
    "src"
  ]
}
```

but this did not help.

## To Recreate

1. Checkout repo
2. `yarn`
3. `yarn test`