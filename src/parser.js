/* eslint indent: "off", curly: "error" */
/* eslint semi: "off", curly: "error" */
/* eslint eol-last: "off", curly: "error" */
/* eslint consistent-return: "off", curly: "error" */

import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

const parser = (file) => {
    const paths = path.resolve(file)
    if (path.extname(file) === '.json') {
       return JSON.parse(readFileSync(paths, 'utf-8'))
    }
    if (path.extname(file) === '.yml' || path.extname(file) === '.yaml') {
       return yaml.load(readFileSync(paths, 'utf-8'))
    }
}

export default parser;