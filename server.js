// server.js 
// where your node app starts

// init project

console.log("server had started")
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
console.log(process.env.PORT)
const spawn = require('child_process').spawn;
let ls = null;
// const ls = spawn('rename', ['.git', 'DOTGIT"]); 
// const ls = spawn('ls', ['-la', 'DOTGIT"]); 
if (false ) {
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
} 
const commands = {
  version: "git --version",
  toDOT: "mv .git DOTGIT",
  frDOT: "mv DOTGIT .git",
  lsdotgit: "ls  -la DOTGIT",
  x: "chmod +x my.bat",
  mkBat: "echo echo stuff >> my.bat",
  echo: "echo YAY!!!"
};

const command = commands.echo;
const exec = require('child_process').exec;

const execp = (command, opts) => {
  const promise = new Promise((resolve,reject) => {
    exec(command, opts, (err, stdout, stderr) => {
      if (err) {
        // console.error(err);
        reject(err)
        return;
      }
      
      resolve(stdout);
    });
  });
  return promise;
  }

execp(command, {})
  .then( (result) => console.log(result))
  .catch( ()=> console.log("fail")) 