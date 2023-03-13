#!/usr/bin/env node

import _ from 'lodash';

import { readFileSync } from 'fs';

const genDiff = (data1, data2) => {
  let acc = {}
  const obj1 = Object.entries(data1)
  const obj2 = Object.entries(data2)
  for (const list1 of obj1) {
    for (const list2 of obj2) {
      if (list1[0] === list2[0] && list1[1] === list2[1]) {
        acc[list1[0]] = list1[1] 
     }
      if (list1[0] === list2[0] && list1[1] !== list2[1]) {
        acc['- ' + list1[0]] = list1[1]
        acc['+ ' + list2[0]] = list2[1]
  }
      if (!_.has(data2, list1[0])) {
        acc['- ' + list1[0]] = list1[1]
      }
      if (!_.has(data1, list2[0])) {
        acc['+ ' + list2[0]] = list2[1]
      }
  }
  }
  const sortedKeys = Object.keys(acc).sort((a, b) => {
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
  sortedObj[key] = acc[key];
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
}

export default (filepath1, filepath2) => {

const data1 = readFileSync(filepath1, 'utf-8')
const data2 = readFileSync(filepath2, 'utf-8')

const dataParse1 = JSON.parse(data1)
const dataParse2 = JSON.parse(data2)

const diff = genDiff(dataParse1, dataParse2);
return objToString(diff)
}
