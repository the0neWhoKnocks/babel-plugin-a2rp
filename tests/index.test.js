const { symlinkSync, unlinkSync } = require('fs');
const { resolve } = require('path');
const { transformFileAsync } = require('@babel/core');
const aliases = require('./src/aliases');
const plugin = require('../index');

const r = (fp) => resolve(__dirname, fp);
const p = (code) => code.split('\n');

describe('plugin', () => {
  const opts = {
    babelrc: false,
    plugins: [
      [plugin, { aliases }],
    ],
  };
  let line;
  
  beforeAll(() => {
    symlinkSync(r('./modules/module.js'), r('./src/components/temp.js'));
  });
  
  afterAll(() => {
    unlinkSync(r('./src/components/temp.js'));
  });
  
  it('should replace aliases in imports and functions', async () => {
    await transformFileAsync(r('./src/components/App/index.js'), opts)
      .then(({ code }) => {
        lines = p(code);
        expect(lines[0]).toEqual(expect.stringContaining('../../utils/loadFile'));
        expect(lines[1]).toEqual(expect.stringContaining('../../config'));
      });
  });
  
  it('should replace aliases in requires', async () => {
    await transformFileAsync(r('./src/server/index.js'), opts)
      .then(({ code }) => {
        lines = p(code);
        expect(lines[0]).toEqual(expect.stringContaining('../components/App'));
      });
  });
  
  it("should NOT transform strings if the don't start with an alias", async () => {
    await transformFileAsync(r('./src/utils/loadFile.js'), opts)
      .then(({ code }) => {
        lines = p(code);
        expect(lines[0]).toEqual(expect.stringContaining('UTILS/loadFile'));
        expect(lines[1]).toEqual(expect.stringContaining('UTILS/loadFile'));
      });
  });
  
  it('should handle symlinked files', async () => {
    await transformFileAsync(r('./src/components/temp.js'), opts)
      .then(({ code }) => {
        lines = p(code);
        expect(lines[0]).toEqual(expect.stringContaining('../utils/loadFile'));
        expect(lines[3]).toEqual(expect.stringContaining("const str = 'ROOT_CLASS'"));
        expect(lines[4]).toEqual(expect.stringContaining('../config'));
      });
  });
});
