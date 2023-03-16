#!/usr/bin/env node

import _ from 'lodash';

import parser from '../src/parser.js'

const genDiff = (data1, data2) => {
  return [...Object.keys(data1), ...Object.keys(data2)].reduce((acc, key) => {
    if (!_.has(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (!_.has(data1, key)) {
      acc[`+ ${key}`] = data2[key];
    } else if (_.isEqual(data1[key], data2[key])) {
      acc[key] = data1[key];
    } else {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    }
    return acc;
  }, {});
};

const sortData = (data) => {
const sortedKeys = Object.keys(data).sort((a, b) => {
  if (a[0] === '+' || a[0] === '-') {
    a = a.slice(2);
  }
  if (b[0] === '+' || b[0] === '-') {
    b = b.slice(2);
  }
  return a.localeCompare(b);
});
const sortedObj = {};
sortedKeys.forEach(key => {
  sortedObj[key] = data[key];
});
  return sortedObj
}

const objToString = (obj) => {
  let diffStr = '{\n';
  for (const key in obj) {
  const value = obj[key]
  diffStr += `  ${key}: ${value}\n`;
}
diffStr += '}';
return diffStr
};

export default (filepath1, filepath2) => {

const dataParse1 = parser(filepath1)
const dataParse2 = parser(filepath2)

const diff = genDiff(dataParse1, dataParse2);
const sortDiff = sortData(diff)
return objToString(sortDiff)
}
