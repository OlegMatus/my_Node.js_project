const path = require('node:path')
const fs = require('node:fs/promises')

const sayHello = async () => {
    try {
        const basePath = path.join(process.cwd(), 'days')

        const fileNames = ['day1.txt', 'day2.txt', 'day3.txt', 'day4.txt', 'day5.txt']
        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']

        await fs.mkdir(basePath, {recursive: true})
        await Promise.all([
            ...folderNames.map(async (name) => {
                await fs.mkdir(path.join(basePath, name))
            }),

            ...fileNames.map(async (name) => {
                await fs.writeFile(path.join(basePath, name), 'Good Morning!')
            })
        ]);
        const promiseArr = await fs.readdir(basePath);
        //     for (const item of promiseArr) {
        //         const stat = await fs.stat(path.join(basePath, item));
        //         console.log(stat.isFile() ? 'isFile:' : 'isFolder:',item);
        //     }
        //     console.log(promiseArr);
        // }catch (e) {
        //     console.log(e.message)
        // }
        await Promise.all(promiseArr.map(async (item) => {
            const stat = await fs.stat(path.join(basePath, item));
            console.log(stat.isFile() ? 'isFile:' : 'isFolder:', item);
        }))
        console.log(promiseArr);
    } catch (e) {
        console.log(e.message)
    }


//     await Promise.all(folderNames.map(async (name) => {
// await fs.mkdir(path.join(basePath, name), {recursive:true})
//     }))
//     await Promise.all(fileNames.map(async (name) => {
// await fs.writeFile(path.join(basePath, name), 'Good Morning!')
//     }))
// }
}
sayHello().then()
// const { sayHello } = require('./sayHello');
// sayHello ();
//
// const path = require('node:path')
// const fs = require('node:fs')
//
// const basePath = path.join(process.cwd(), 'days')
// fs.mkdir(basePath, (err) => {
//     if (err) {
//         console.error('Bad request', err);
//         return;
//     }
//     console.log('Successful');
// })
// for (let i=1; i <=5; i++) {
// const filePath = path.join(basePath, `file${i}.txt`);
// const folderPath = path.join(basePath,`folder${i}`);
// fs.writeFile(filePath, `Day${i}.txt`, (err) => {
//     if (err) {
//         throw new Error(err.message)
//     }
// })
// fs.mkdir(folderPath, (err) => {
//     if (err) {
//         throw new Error(err.message)
//     }
// })
// }
// fs.readdir(basePath,(err,files) => {
//     if (err) throw err
//     files.forEach((file)=> {
//         const filePath = path.join(basePath, file)
//         fs.stat(filePath,(err,stats)=> {
//             if (err) throw err
//             if (stats.isFile()) {
//                 console.log(`${file} - is file`)
//             }else if(stats.isDirectory()) {
//                 console.log(`${file} - is directory`)
//             }else {
//                 console.log(`${file} - is null`)
//             }
//         })
//     })
// })
