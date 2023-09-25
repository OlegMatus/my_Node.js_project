const express = require('express');
const fsService = require('./fs.service');
const fs = require("fs/promises");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const arrUsers = [
    {"id": 1, "name": "John", "age": 30},
    {"id": 2, "name": "Alice", "age": 25},
    {"id": 3, "name": "Bob", "age": 35},
    {"id": 4, "name": "Eve", "age": 28},
    {"id": 5, "name": "Charlie", "age": 40}
];
const data = JSON.stringify({users: arrUsers});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


   // app.get('/users', (req, res) =>{
   //     const users = JSON.stringify(data).arrUsers;
   //     res.json({
   //         data: arrUsers
   //     })
   // })

fs.mkdir(dataFolder, { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(`${dataFolder}/db.json`, data, (err) => {
        if (err) throw err;

        console.log('db.json created with initial users.');
    });
});

async function users() {
    try {
        const usersPath = path.join(__dirname, 'users.json');

        const data = await fs.readFile(`${dataFolder}/db.json`, { encoding: 'utf8' });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
users().then()


const PORT = 5000;

app.listen(PORT, () => {
    console.log('Server has successful')
})
