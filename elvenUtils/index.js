const { createReadStream, readFileSync } = require('fs')
const { createInterface } = require('readline')

const getLineStream = path => createInterface({
  input: createReadStream(path)
})

const getFileContents = (path, encoding='utf=8') => readFileSync(path, 'utf8')

const getLineArray = (
  path,
  {
    filterFn = l => l, // by default discard empty lines since Unix likes terminal newline
    parserFn = l => l.trim(),
  }
) => getFileContents(path)
  .split('\n')
  .filter(filterFn)
  .map(parserFn)

module.exports = {
  getLineStream,
  getFileContents,
  getLineArray
}