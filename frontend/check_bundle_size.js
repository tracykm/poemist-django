const fs = require("fs")
const path = require("path")

const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, file))
    }
  })

  return arrayOfFiles
}

const getTotalSize = function (directoryPath) {
  const arrayOfFiles = getAllFiles(directoryPath)

  let totalSize = 0
  arrayOfFiles.forEach(function (filePath) {
    totalSize += fs.statSync(filePath).size
  })

  return totalSize
}

const total = getTotalSize("./build")
const js = getTotalSize("./build/static/js")
const css = getTotalSize("./build/static/css")
const media = getTotalSize("./build/static/media")
console.log(JSON.stringify({ total, js, css, media }, null, 2))
