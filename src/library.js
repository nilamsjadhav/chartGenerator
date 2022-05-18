const fs = require('fs');
const values = statistics => Object.values(statistics);

const length = statistics => Object.keys(statistics).length;

const keys = statistics => Object.keys(statistics);

const generateAttribute = function (attribute, value) {
  return attribute + '=' + '"' + value + '"';
};

const writeData = (file, content) => fs.writeFileSync(file, content, 'utf8');

const openingTag = (tag, property = '') => '<' + tag + ' ' + property + '>';

const closingTag = tag => ['</', tag, '>'].join('');

const generateTag = function (tag, content, property = '') {
  return openingTag(tag, property) + content + closingTag(tag);
};

const createProperty = (attribute, value) => attribute + ':' + value;

const getDenominator = function(value){
  const length = value.toString().length;
  return +(1 + '0'.repeat(length));
};

const computePercentage = function (greatestValue) {
  return function (value) {
    const denominator = getDenominator(greatestValue);
    return value / denominator * 100 * 10;
  };
};

const calculatePercentage = function (values, greatestValue) { 
  return values.map(computePercentage(greatestValue));
};

const max = (num1, num2) => Math.max(num1, num2);

const convertToPercentage = function (values) {
  const maxValue = values.reduce(max);
  return maxValue ? calculatePercentage(values, maxValue) : values;
};

exports.values = values;
exports.length = length;
exports.keys = keys;
exports.generateAttribute = generateAttribute;
exports.generateTag = generateTag;
exports.createProperty = createProperty;
exports.convertToPercentage = convertToPercentage;
exports.writeData = writeData;
