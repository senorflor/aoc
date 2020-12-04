const { createReadStream, readFileSync } = require('fs')
const { createInterface } = require('readline')

const getLineStream = path => createInterface({
  input: createReadStream(path)
})

const getFileContents = (path, encoding='utf8') => readFileSync(path, encoding)

const getRecords = (
  path,
  {
    delimiter = '\n',
    filterFn = r => r, // by default discard empty records
    parserFn = r => r.trim(),
  }
) => getFileContents(path)
  .split(delimiter)
  .filter(filterFn)
  .map(parserFn)

module.exports = {
  getLineStream,
  getFileContents,
  getRecords
}