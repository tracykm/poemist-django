const buildSize = require("./buildSize.json")
const buildSizeNew = require("./buildSize2.json")

console.log({ buildSize, buildSizeNew })

const diffArray = Object.entries(buildSize).map(([name, size]) => {
  const newSize = buildSizeNew[name]
  return {
    name,
    size: newSize - size,
  }
})

console.log(diffArray)

if (buildSizeNew.total - buildSize.total > 200) {
  console.warn("bundle got much bigger")
  process.exit(1)
}
