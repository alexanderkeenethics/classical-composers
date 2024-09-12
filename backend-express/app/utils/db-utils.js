const fs = require('fs');
const path = require('path');


async function readFile(dbName){
    return new Promise((resolve, reject) => {
        if (!dbName) reject('Invalid DB name');
        const filePath = path.join(__dirname, '..' , 'resources', `${dbName}.json`);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading file:', err);
            }
            try {
                resolve(JSON.parse(data));
            } catch (error) {
                reject('Error parsing JSON:', error);
            }
        });
    })
}

exports.getAllComposers = async function(){
    return await readFile('composers');
}


exports.getContactData = async function(composerId){
    const addresses = await readFile('contacts');
    if (!addresses || !Array.isArray(addresses)) return null;

    return addresses.find(el => el.id == composerId);
}
