const fs = require('node:fs/promises')

const path = require("path");

const dataFolder = path.join(process.cwd(), 'data');

const reader = async () => {
    const  json = await fs.readFile(dataFolder, {encoding: "utf-8"});
    return JSON.parse(json);
};

const writer = async  (users)=> {
    await fs.writeFile(dataFolder, JSON.stringify(users))
};

module.exports = {
    reader,
        writer
}