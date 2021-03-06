const express = require('express');
const BodyParser = require('body-parser');
const child_process = require('child_process');
const chdir = require('chdir');


const app = express();

app.use(BodyParser.urlencoded({
  extended: true,
}));

app.use(BodyParser.json());

app.listen(2020, () => console.log('Example app listening on port 2020'));

app.get('/', (req, res) => res.send('autodeploy-server is ready to work!'));

app.post('/', (request, response, next) => {
  console.clear();
  console.log(request.body);

  if (request.headers['x-github-event'] === 'push' && request.body.repository.full_name === 'VegasChickiChicki/nuxt-chat'){
    chdir('../nuxt-chat', async () => {
      console.log('process.cwd: ', process.cwd());

      console.log('start pipeline!');

      child_process.exec('git pull && npm install && npm run build && pm2 restart nuxt-chat',(err, stdout) =>{
        console.log('error: ', err);
        console.log('stdout: ', stdout);
      }).on('exit', code => {
        console.log('end pipeline!');
        console.log('code: ', code);
      });
    });
  }

  if (request.headers['x-github-event'] === 'push' && request.body.repository.full_name === 'VegasChickiChicki/api-server'){
    chdir('../express-server', async () => {
      console.log('process.cwd: ', process.cwd());

      console.log('start pipeline!');

      child_process.exec('git pull && npm install && pm2 restart api-server',(err, stdout) =>{
        console.log('error: ', err);
        console.log('stdout: ', stdout);
      }).on('exit', code => {
        console.log('end pipeline!');
        console.log('code: ', code);
      });
    });
  }

  next();
});