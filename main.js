// Trent Gombas   A01268097

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip(zipFilePath, pathUnzipped)
.then((resolve) => console.log(resolve))
.catch((err) => console.log(err))

IOhandler.readDir('unzipped')
.then((resolve) => console.log(resolve))
.catch((err) => console.log(err))

IOhandler.grayScale(pathUnzipped, pathProcessed)
