module.exports = {
  getFolderStructure: getFolderStructure
}

const fs = require("fs")
const path = require("path")

function getFolderStructure(path_folder) {
    let obj = [];
    let data = fs.readdirSync(path_folder);
    for (k in data){
      let stats =  fs.statSync(path.join(path_folder,data[k]))
      if(stats.isDirectory()){
        let o = {};
        o[data[k]] = getFolderStructure((path.join(path_folder,data[k])))
        obj.push(o)
      }else{
        obj.push(data[k])
      }
    }



    return obj
}