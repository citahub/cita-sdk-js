const fs = require('fs')
const path = require('path')

const abisOrigin = path.resolve(__dirname, '../cita-sys-abi')
const abisTarget = path.resolve(__dirname, '../src/systems/abis')

fs.readdir(abisOrigin, (err, fileNames) => {
  if (err) {
    // throw err
    console.warn(err)
    return
  }
  const abiFiles = fileNames.filter(fileName => fileName.endsWith('.abi'))
  abiFiles.forEach(abiFile => {
    fs.readFile(path.resolve(abisOrigin, abiFile), (err, abi) => {
      if (err) {
        console.warn(err)
        return
      }
      const abiText = 'export default ' + abi.toString('utf-8')
      const fileName = abiFile[0].toLocaleLowerCase() + abiFile.slice(1).replace('.abi', '.ts')
      console.log(fileName)
      fs.writeFile(path.resolve(abisTarget, fileName), abiText, err => {
        console.warn(err)
        return
      })
    })
  })
})
