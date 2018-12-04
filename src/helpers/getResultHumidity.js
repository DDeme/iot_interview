const math = require('mathjs')

const PERCENTAGE_THRESHOLD = 0.01

const getResultHumidity = (reference, values) => {
  const threshold = math.multiply(reference, PERCENTAGE_THRESHOLD)
  const upperThreshold = reference + threshold
  const lowerThreshold = reference - threshold
  return values.every(v => v >= lowerThreshold && v <= upperThreshold)
    ? 'keep'
    : 'discard'
}

module.exports = getResultHumidity
