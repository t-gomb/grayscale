// Trent Gombas   A01268097

const { rejects } = require("assert");
const { resolve } = require("path");
const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise ((resolve, reject) => {
    if(fs.existsSync(pathOut)){
      reject('Exists')
    }else{
      fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }));
      resolve('Extraction operation complete')
    }
  })
};


/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise ((resolve, reject) => {
    myArr = []
    fs.readdir(dir, (err, files) => { 
      files.forEach(file => {
        if(path.extname(file) != ".png"){
        }else{
          myArr.push(file)
        }
      });
      resolve(myArr)
  })
  })
};


/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  readDir(pathIn)
  .then(content => {
    content.forEach((item) => {
      fs.createReadStream(pathIn + "\\" + item)
      
      .pipe(
        new PNG({
          
        }))
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            let avg = (this.data[idx] + this.data[idx+1] + this.data[idx+2]) / 3
     
            // invert color
            this.data[idx] = avg;
            this.data[idx + 1] = avg;
            this.data[idx + 2] = avg;
     
            // and reduce opacity
            this.data[idx + 3] = this.data[idx + 3] >> 1;
          }
        }
        this.pack().pipe(fs.createWriteStream(pathOut + "\\" + item));
      });
    })
    })
    .catch("error")
};


module.exports = {
  unzip,
  readDir,
  grayScale,
};
