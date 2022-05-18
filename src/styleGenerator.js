const lib = require('./library.js');
const { writeData, values, createProperty, convertToPercentage } = lib;

const encloseStyle = (className, property) => {
  return className + ' { ' + property + '}';
};

const arrangeProperties = function (element, index) {
  const className = '.div' + (index + 1);
  const property = createProperty('height', element + 'px');
  return encloseStyle(className, property) + '\n';
};

const generateStyle = function (values) {
  return values.map(arrangeProperties).join('');
};

const generateStyleSheet = function (statistics, styleSheet) {
  const valueInPercentage = convertToPercentage(values(statistics));
  const style = generateStyle(valueInPercentage);
  writeData(styleSheet, style);
};
exports.generateStyleSheet = generateStyleSheet;
