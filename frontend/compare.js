var bundleSize = require("./buildSize.json")
var bundleSizeNew = require("../../frontend/buildSize2.json")

const diffArray = Object.entries(bundleSize).map(([name, size]) => {
  var newSize = bundleSizeNew[name]
  return {
    name,
    size: newSize - size,
  }
})

console.log(diffArray)
