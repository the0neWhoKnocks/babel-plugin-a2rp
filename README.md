# Babel Plugin - Aliases to Relative Paths

[![Build Status](https://travis-ci.org/the0neWhoKnocks/babel-plugin-a2rp.svg?branch=master)](https://travis-ci.org/the0neWhoKnocks/babel-plugin-a2rp)
[![npm version](https://badge.fury.io/js/%40noxx%2Fbabel-plugin-a2rp.svg?cb=1)](https://badge.fury.io/js/%40noxx%2Fbabel-plugin-a2rp)

Converts aliases in Strings to relative paths

---

## Install

```sh
npm i -D @noxx/babel-plugin-a2rp
```

---

## Usage

First create aliases that can be utilized by the plugin. The format for the
aliases Object are key value pairs where the key is the alias, and value is the
actual path that maps to a specific directory.
```js
// aliases.js
const { resolve } = require('path');

const ROOT = resolve(__dirname, './');
const SRC = `${ ROOT }/src`;

module.exports = {
  COMPONENTS: `${ SRC }/components`,
  SERVER: `${ SRC }/server`,
};
```

In your `babel.config.js` file, add the plugin at the top of the `plugins` list
to ensure aliases are replaced and paths are resolved correctly.
```js
const aliases = require('./aliases');

module.exports = (api) => {
  api.cache(true);
  
  return {
    plugins: [
      ['@noxx/babel-plugin-a2rp', { aliases }],
      // other plugins
    ],
  };
};
```
