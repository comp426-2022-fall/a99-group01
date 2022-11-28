import minimist from 'minimist';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import Database from "better-sqlite3"

const db = new Database('project.db');
db.pragma('journal_mode = WAL');


const sqlInit = `CREATE TABLE users ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, pass VARCHAR );`
try {
    db.exec(sqlInit);
} catch (error) {
}

const sqlInit2 = `CREATE TABLE data ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, message VARCHAR, sentiment VARCHAR, date VARCHAR );`
try {
    db.exec(sqlInit2);
} catch (error) {
}

const sqlInit3 = `CREATE TABLE logs ( id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, message VARCHAR, time VARCHAR);`
try {
    db.exec(sqlInit3);
} catch (error) {
}

const args = minimist(process.argv.slice(2));
const port = args.port || 2000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// link stylesheet to the right folder
app.use(express.static("public"))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.redirect('/login');
})

app.get('/app', function (req, res) {
    res.redirect('/login');
})

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function(req, res) {
    const user = req.body.username;
    const pass = req.body.password;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'attempted to login', '${today.toISOString()}');`;
    db.exec(stmt1)

    const stmt = db.prepare(`SELECT * FROM users WHERE user='${user}' and pass='${pass}';`);
    let row = stmt.get();
    if (row === undefined) {
        req.app.set('user', user);
        req.app.set('pass', pass);
        res.redirect('/stale_login');
    } else {
        req.app.set('user', user);
        req.app.set('pass', pass);
        res.redirect('/home');
    }
});

app.get('/stale_login', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'failed to login', '${today.toISOString()}');`;
    db.exec(stmt1)
    res.render('bad_login');
});

app.get('/home', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'succesful login or return to home', '${today.toISOString()}');`;
    db.exec(stmt1)
    res.render('home');
});

app.get('/acc_info', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'viewed account info', '${today.toISOString()}');`;
    db.exec(stmt1)
    res.render('acc_info', {user: req.app.get('user'), pass: req.app.get('pass')});
});

app.get('/view_history', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'viewed entry history', '${today.toISOString()}');`;
    db.exec(stmt1)
    const stmt = db.prepare(`SELECT * FROM data WHERE user = '${req.app.get('user')}';`);
    let all = stmt.all();
    res.render('view_history', {data: all});
});

app.get('/view_logs', function(req, res){
    const stmt = db.prepare(`SELECT * FROM logs;`);
    let all = stmt.all();
    res.render('view_logs', {data: all});
});

app.get('/new_entry', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'clicked to make new entry', '${today.toISOString()}');`;
    db.exec(stmt1)
    res.render('new_entry');
});

app.post('/new_entry', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user2 = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user2}', 'submitted an entry', '${today.toISOString()}');`;
    db.exec(stmt1)

    const user = req.app.get('user');
    const message = req.body.message;
    const sentiment = req.body.sentiment;
    const date = req.body.date;
    const stmt = `INSERT INTO data (user, message, sentiment, date) VALUES ('${user}', '${message}', '${sentiment}', '${date}');`;
    db.exec(stmt)

    res.render('success_entry');

});

app.post('/delete_acc', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user1 = req.body.username
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user1}', 'deleted account', '${today.toISOString()}');`;
    db.exec(stmt1)

    const user = req.body.username;
    const pass = req.body.password;
    const stmt = `DELETE FROM users WHERE user='${user}' and pass='${pass}';`
    db.exec(stmt)
    res.render('acc_deleted');
});


app.get('/users_db', function(req, res){
    const stmt = db.prepare(`SELECT * FROM users;`);
    let all = stmt.all();

    if(row === undefined) {
        res.send('nothing in db');
    } else {
        res.send(all);
    }
});

app.get('/logs_db', function(req, res){
    const stmt = db.prepare(`SELECT * FROM logs;`);
    let all = stmt.all();

    if(row === undefined) {
        res.send('nothing in db');
    } else {
        res.send(all);
    }
});


app.get('/data_db', function(req, res){
    const stmt = db.prepare(`SELECT * FROM data;`);
    let all = stmt.all();

    if(row === undefined) {
        res.send('nothing in db');
    } else {
        res.send(all);
    }
});

app.post('/newacc', function(req, res) {
    const user = req.body.username;
    const pass = req.body.password;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const stmt2 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'tried to create new user', '${today.toISOString()}');`;
    db.exec(stmt2)

    const stmt1 = db.prepare(`SELECT * FROM users WHERE user='${user}'`);
    let row = stmt1.get();

    if (row === undefined) {
        const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
        db.exec(stmt)
        res.render('new_acc_made');
    } else {
        res.render('username_exists')
    }
    
});

app.listen(port)
