/* eslint no-undef: "off", curly: "error" */

import genDiff from '../src/genDiff.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = "{\n  - follow: false\n  host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}"
const expected2 = "{\n    common: {\n        + follow: false\n        setting1: Value 1\n        - setting2: 200\n        - setting3: true\n        + setting3: null\n        + setting4: blah blah\n        + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n                - wow: \n                + wow: so much\n            }\n            key: value\n            + ops: vops\n        }\n    }\n    group1: {\n        - baz: bas\n        + baz: bars\n        foo: bar\n        - nest: {\n            key: value\n        }\n        + nest: str\n    }\n    - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n    + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}"

test('plain files genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expected);
});

test('nested files genDiff', () => {
  expect(genDiff(getFixturePath('nestedfile1.json'), getFixturePath('nestedfile2.json'))).toEqual(expected2);
  expect(genDiff(getFixturePath('nestedfile1.yml'), getFixturePath('nestedfile2.yml'))).toEqual(expected2);
});


