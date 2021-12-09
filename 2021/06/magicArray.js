const factorial = (x) => {
  const n = BigInt(x)
  const bigFactorial = (n) => (n > 1n)
    ? n * bigFactorial(n - 1n) : 1n
  return bigFactorial(n)
}

const choices = (n, k) => {
  return Number(factorial(n) / (factorial(k) * factorial(n - k)))
}

const sumMap = {}
const limit = Math.ceil(256 / 7) + 1 // Limit generation of array
for (let i = 0; i < limit; i++) {
  for (let j = 0; j < limit; j++) {
    const product = i * 7 + j * 9;
    sumMap[product] = (sumMap[product] || 0) + choices(i + j, i || j)
  }
}
const magicArray = Array(256)
for (let i = 0, accum = 1; i < 256; i++) {
  accum += (sumMap[i] || 0)
  magicArray[i] = accum
}

console.log(magicArray)
