const evaluateLogFile = require('./src/evaluateLogFile')

const fs = require('fs')

const FILE = './input/data.txt'
const loadData = file => fs.readFileSync(file, 'utf-8')

console.log(JSON.stringify(evaluateLogFile(loadData(FILE))))
