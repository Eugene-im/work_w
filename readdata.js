/**
 * 
 */

const fs = require('fs');
const path = require('path');


const configFolder = path.resolve('./');

function loadFile(fileName,folderPath=configFolder) {
    return new Promise(function (resolve, reject) {
        let filepath = path.format({
            dir: folderPath,
            base: fileName
        });
        fs.readFile(filepath, 
            { encoding: 'utf8' },
            (error, data) => {
                if (error) return reject(error);
                let fileType=path.extname(fileName)
                switch (fileType) {
                    // case '.json':
                    //     return resolve(JSON.parse(data));
                    case '.txt':
                    case '.csv':
                        return resolve(data.split(/\r\n|\r|\n/));
                    default:
                        return resolve(data);
                }
            }
        )
    })
};
function uploadFile(fileName,data,folderPath=configFolder) {
    return new Promise(function (resolve, reject) {
        let fileType=path.extname(fileName)
        switch (fileType) {
            case '.json':
                data = JSON.stringify(data, null, '\t');
                break;
            case '.txt':
            case '.csv':
                data = data.join('\r\n');
                break;
            default:
                break;
        }
        let filepath = path.format({
            dir: folderPath,
            base: fileName
        });
        fs.writeFile(filepath, 
            data,
            { encoding: 'utf8' },
            (error) => {
                if (error) return reject(error);
                return resolve();
            }  
        )
    })
};

async function fileList(extFile='*',folderPath=configFolder) {
    return new Promise(function(resolve, reject) {
        fs.readdir(folderPath,(err,files)=>{
            if (err) return reject(err); 
            if (extFile == '*') return resolve(files);
            let list = [];
            for (let file of files) 
                if (path.extname(file) === ('.'+extFile)) 
                    list.push(file);
            if(list.length==0) return resolve("no such file");
            resolve(list);
        })
    })
};

const filename = new Date().toLocaleDateString()+'.json';

(async()=>{
    try {
        let data = await loadFile(filename);
        data = '{"data":'+data+'}';
        data = JSON.parse(data);
        console.log('>>',typeof data.data,data.data['length']);
        for (const key in data.data) {
            console.log('*',data.data[key]);
        }
    } catch (error) {
        console.error(error);
    }
})();
