const { getResult, isBeginOfReading } = require('./helpers/getResult')

const getReference = (check, thermometer, humidity) => {
  if (check !== 'reference') {
    throw new Error('First line of file should start with reference line.')
  }

  return {
    thermometer: parseFloat(thermometer),
    humidity: parseFloat(humidity),
  }
}

const evaluateLogFile = file => {
  let reference = {}
  let currentlyReading = []
  let values = []
  let result = {}

  file
    .split('\n')
    .map(line => line.split(' '))
    .forEach((line, i, array) => {
      if (i === 0) {
        reference = getReference(...line)
        return
      }
      const beginOfReading = isBeginOfReading(...line)

      if (beginOfReading) {
        // reset interator
        // set sensorName
        if (currentlyReading.length !== 0) {
          result[currentlyReading[1]] = getResult(
            currentlyReading,
            reference,
            values
          )
        }
        values = []
        currentlyReading = line
        return
      }
      // end of file
      if (i === array.length - 1) {
        result[currentlyReading[1]] = getResult(
          currentlyReading,
          reference,
          values
        )
      }

      values.push(parseFloat(line[1]))
    })

  return result
}

module.exports = evaluateLogFile
