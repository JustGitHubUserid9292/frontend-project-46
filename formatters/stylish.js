/* eslint indent: "off", curly: "error" */
/* eslint semi: "off", curly: "error" */
/* eslint fp/no-mutation: "off", curly: "error" */
/* eslint fp/no-mutating-methods: "off", curly: "error" */
/* eslint eol-last: "off", curly: "error" */
/* eslint no-param-reassign: "off", curly: "error" */
/* eslint arrow-parens: "off", curly: "error" */
/* eslint no-trailing-spaces: "off", curly: "error" */

import _ from 'lodash';

    const stylish = (data1, data2) => {
      const keys = _.union(_.keys(data1), _.keys(data2)).sort();
      return keys.reduce((acc, key) => {
       if (!_.has(data2, key)) {
         acc[`- ${key}`] = data1[key];
       } else if (!_.has(data1, key)) {
         acc[`+ ${key}`] = data2[key];
       } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
         acc[key] = stylish(data1[key], data2[key]);
       } else if (!_.isEqual(data1[key], data2[key])) {
         acc[`- ${key}`] = data1[key];
         acc[`+ ${key}`] = data2[key];
       } else {
         acc[key] = data1[key];
       }
       return acc;
     }, {});
   };

   const stylishToString = (str) => {
    const arr = str.split('\n')
    .map((elm) => {
      if (elm.trim().startsWith('+') || elm.trim().startsWith('-')) {
        elm = elm.slice(2) 
      }
      return elm
    })
    return arr.join('\n')
  }

export { stylish, stylishToString };