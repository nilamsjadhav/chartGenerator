const { generateChart } = require('./chartGenerator.js');
const { generateStyleSheet } = require('./styleGenerator.js');
const statistics = require('../resource/statistics.json');

const barStyleSheet = '../css/barStyle.css';
const styleSheet = '../css/style.css';
const html = './chart/html/index.html';
generateChart(html, styleSheet, barStyleSheet, statistics);
generateStyleSheet(statistics, './chart/css/barStyle.css');
