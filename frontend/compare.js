var buildSize = require("./buildSize.json")
var buildSizeNew = require("./buildSize2.json")

const diffArray = Object.entries(buildSize).map(([name, size]) => {
  var newSize = buildSizeNew[name]
  return {
    name,
    size: newSize - size,
  }
})

console.log(diffArray)
