import minimist from 'minimist';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import Database from "better-sqlite3"

const db = new Database('project.db');
db.pragma('journal_mode = WAL');


const sqlInit = `CREATE TABLE users ( id INTEGER PRIMARY KEY AUTO_INCREMENT, user VARCHAR, pass VARCHAR );`
try {
    db.exec(sqlInit);
} catch (error) {

}


const args = minimist(process.argv.slice(2));
const port = args.port || 2000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.redirect('/login');
})

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function(req, res) {
    const user = req.body.username;
    const pass = req.body.password;

    const stmt = db.prepare(`SELECT * FROM users WHERE user='${user}' and pass='${pass}';`);
    let row = stmt.get();
    if (row === undefined) {
        res.redirect('/stale_login');
    } else {
        res.redirect('/home');
    }
});

app.get('/stale_login', function(req, res){
    res.render('bad_login');
});

app.get('/home', function(req, res){
    res.render('home');
});

app.get('/db', function(req, res){
    const stmt = db.prepare(`SELECT * FROM users;`);
    let row = stmt.get();

    if(row === undefined) {
        res.send('nothing in db');
    } else {
        res.send(row);
    }
});

app.post('/newacc', function(req, res) {
    const user = req.body.username;
    const pass = req.body.password;

    const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
    db.exec(stmt)

    res.render('new_acc_made');
});

app.listen(port)
