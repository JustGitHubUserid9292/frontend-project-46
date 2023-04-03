/* eslint no-undef: "off", curly: "error" */
/* eslint semi: "off", curly: "error" */
/* eslint quotes: "off", curly: "error" */
/* eslint no-multiple-empty-lines: "off", curly: "error" */
/* eslint import/order: "off", curly: "error" */
/* eslint import/no-duplicates: "off", curly: "error" */

import genDiff from '../src/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = "{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}"
const expected2 = "{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}";
const expected3 = "Property 'common.follow' was added with value: false\nProperty 'common.setting2' was removed\nProperty 'common.setting3' was updated. From true to null\nProperty 'common.setting4' was added with value: 'blah blah'\nProperty 'common.setting5' was added with value: [complex value]\nProperty 'common.setting6.doge.wow' was updated. From '' to 'so much'\nProperty 'common.setting6.ops' was added with value: 'vops'\nProperty 'group1.baz' was updated. From 'bas' to 'bars'\nProperty 'group1.nest' was updated. From [complex value] to 'str'\nProperty 'group2' was removed\nProperty 'group3' was added with value: [complex value]";
const expected4 = '{"common":{"+ follow":false,"setting1":"Value 1","- setting2":200,"- setting3":true,"+ setting3":null,"+ setting4":"blah blah","+ setting5":{"key5":"value5"},"setting6":{"doge":{"- wow":"","+ wow":"so much"},"key":"value","+ ops":"vops"}},"group1":{"- baz":"bas","+ baz":"bars","foo":"bar","- nest":{"key":"value"},"+ nest":"str"},"- group2":{"abc":12345,"deep":{"id":45}},"+ group3":{"deep":{"id":{"number":45}},"fee":100500}}';

test('plain files genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expected);
});

test('nested files genDiff', () => {
  expect(genDiff(getFixturePath('nestedfile1.json'), getFixturePath('nestedfile2.json'))).toEqual(expected2);
  expect(genDiff(getFixturePath('nestedfile1.yml'), getFixturePath('nestedfile2.yml'))).toEqual(expected2);
});

test('plain format genDiff', () => {
  expect(genDiff(getFixturePath('nestedfile1.json'), getFixturePath('nestedfile2.json'), 'plain')).toEqual(expected3);
});

test('json format genDiff', () => {
  expect(genDiff(getFixturePath('nestedfile1.json'), getFixturePath('nestedfile2.json'), 'json')).toEqual(expected4);
});

