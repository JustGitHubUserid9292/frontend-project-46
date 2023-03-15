import genDiff from '../src/genDiff.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json files genDiff', () => {
  const expected = "{\n  - follow: false\n  host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}"
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
});

