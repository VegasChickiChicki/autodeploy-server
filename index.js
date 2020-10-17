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

app.post('/', (request, response, next) => {
  console.clear();
  console.log(request.body);

  if (request.headers['x-github-event'] === 'push' && request.body.repository.full_name === 'VegasChickiChicki/nuxt-chat'){
    chdir('../nuxt-chat', () => {
      console.log('process.cwd: ', process.cwd());

      console.log('start git pull && npm run build && npm run start');

      child_process.exec('git pull && npm run build && kill -15 `lsof -t -i:3000` && npm run start',(err, stdout) =>{
        console.log('error: ', err);
        console.log('stdout: ', stdout);
      }).on('exit', code => {
        console.log('git pull && npm run build && npm run start');
        console.log('code: ', code);
      });
    });
  }

  next();
});