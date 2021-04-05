const oldBundleSize = require("./old/bundleSize.json")
const bundleSize = require("./bundleSize2.json")

console.log({ oldBundleSize, bundleSize })

const diffArray = Object.entries(oldBundleSize).map(([name, size]) => {
  const newSize = bundleSize[name]
  return {
    name,
    size: newSize - size,
  }
})

console.log(diffArray)

if (bundleSize.total - oldBundleSize.total > 200) {
  console.warn("bundle got much bigger")
  process.exit(1)
}
