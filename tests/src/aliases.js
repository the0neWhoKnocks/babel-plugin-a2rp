const { resolve } = require('path');

const ROOT = resolve(__dirname, './');

module.exports = {
  COMPONENTS: `${ ROOT }/components`,
  SERVER: `${ ROOT }/server`,
  UTILS: `${ ROOT }/utils`,
  ROOT,
};