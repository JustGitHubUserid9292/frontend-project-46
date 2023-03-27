import _ from 'lodash';

const formatValue = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    if (value instanceof Object) {
      return '[complex value]';
    }
    return value;
  };
  
  const clear = (result) => result.flat().filter((elm, index) => elm !== undefined && result.indexOf(elm) === index).join('\n')  
  
  const plainFormatter = (diff) => {
    const iter = (diff, ancestry) => {
      const keys = _.keys(diff)
      const result = keys.map(key => {
        const updated = keys.filter(elm => {
          const subStr = key.slice(2)
          return elm.includes(subStr)
        })
        const newName = [...ancestry, key.startsWith('+') || key.startsWith('-') ? key.slice(2) : key].join('');
        if (updated.length === 2) {
          return `Property '${newName}' was updated. From ${formatValue(diff[updated[0]])} to ${formatValue(diff[updated[1]])}`
        }
        if (key.startsWith('+')) {
          return `Property '${newName}' was added with value: ${formatValue(diff[key])}`
        }
        if (key.startsWith('-')) {
          return `Property '${newName}' was removed`
        }
        if (_.isPlainObject(diff[key])) {
          return iter(diff[key], `${newName}.`);
        }
      }) 
      return clear(result)
    }
    return iter(diff, '')
  }

export default plainFormatter;