const lib = require('./library.js');
const { writeData, keys, generateTag, generateAttribute, values } = lib;

const formLink = function (chartStyle) {
  const href = generateAttribute('href', chartStyle);
  const rel = generateAttribute('rel', 'stylesheet');
  return generateTag('link', '', rel + ' ' + href);
};

const headTag = function (chartStyle, barStyle) {
  const title = generateTag('title', 'Chart');
  const chartStyleLink = formLink(chartStyle);
  const barStyleLink = formLink(barStyle);
  return generateTag('head', title + chartStyleLink + barStyleLink);
};

const bars = function (value, index) {
  const span = generateTag('span', value, generateAttribute('class', 'value'));
  const className = 'div' + (index + 1);
  const div = generateTag('div', '', generateAttribute('class', className));
  return span + div;
};

const concate = function (lines) {
  return function (label, index) {
    const bar = lines[index] + label;
    return generateTag('div', bar, generateAttribute('class', 'bar'));
  };
};

const labels = function (element) {
  return generateTag('div', element, generateAttribute('class', 'name'));
};

const chart = function (statistics) {
  const lines = values(statistics).map(bars);
  const names = keys(statistics).map(labels);
  const barChart = names.map(concate(lines)).join('');
  return generateTag('div', barChart, generateAttribute('class', 'chart'));
};

const bodyTag = function (statistics){
  return generateTag('body', chart(statistics));
};

const formChart = function (chartStyle, barStyle, statistics) {
  const head = headTag(chartStyle, barStyle);
  const body = bodyTag(statistics);
  return generateTag('html', head + body);
};

const generateChart = function (htmlFile, chartStyle, barStyle, statistics) {
  const chart = formChart(chartStyle, barStyle, statistics);
  writeData(htmlFile, chart);
};

exports.generateChart = generateChart;
