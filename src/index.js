/* eslint no-useless-escape: "off" */
/* eslint indent: "off", curly: "error" */
/* eslint semi: "off", curly: "error" */
/* eslint quotes: "off", curly: "error" */
/* eslint padded-blocks: "off", curly: "error" */

import parser from './parser.js'

import { stylish, stylishToString } from '../formatters/stylish.js'

import plainFormatter from '../formatters/plain.js'

import jsonFormatter from '../formatters/json.js'

const genDiff = (data1, data2, formatType = 'stylish') => {
  const diff = stylish(data1, data2)
  if (formatType === 'plain') {
    return plainFormatter(diff)
  }
  if (formatType === 'json') {
    return jsonFormatter(diff)
  }
  return stylishToString(JSON.stringify(diff, null, 4).replace(/\"/g, "").replace(/\,/g, ""))
}

export default (filepath1, filepath2, formatType) => {

const dataParse1 = parser(filepath1)
const dataParse2 = parser(filepath2)

return genDiff(dataParse1, dataParse2, formatType);
}
