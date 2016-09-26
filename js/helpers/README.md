# Handlebars Helpers

These helpers are a bit special as they're not loaded quite the way one may expect. Rather, these files are automatically loaded by Webpack when it precompiles the Handlebars templates.

The name of the file will be the helper's name. The helper function should be assigned to `module.exports` so that the Handlebars loader can handle it appropriately.
