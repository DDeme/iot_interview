const evaluateLogFile = require('./src/evaluateLogFile')
const fs = require('fs')
const fileString = fs.readFileSync('./input/data.txt', 'utf-8')

describe('test of simple use case ', () => {
  test('1st sample', () => {
    expect(evaluateLogFile(fileString)).toMatchSnapshot()
  })
})
