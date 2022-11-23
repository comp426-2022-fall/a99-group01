import minimist from 'minimist';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

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

    res.send(user + pass);
});


app.listen(port)
