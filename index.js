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
  //console.log(request.body);

  if (request.headers['x-github-event'] === 'push' && request.body.repository.full_name === 'VegasChickiChicki/nuxt-chat'){
    chdir('../nuxt-chat', async () => {
      console.log('process.cwd: ', process.cwd());

      console.log('start pipeline!');

      await child_process.exec('git pull',(err, stdout) =>{
        console.log('error: ', err);
        console.log('stdout: ', stdout);
      }).on('exit', code => {
        console.log('git pull');
        console.log('code: ', code);
      });

      await child_process.exec('npm run build',(err, stdout) =>{
        console.log('error: ', err);
        console.log('stdout: ', stdout);
      }).on('exit', code => {
        console.log('npm run build');
        console.log('code: ', code);
      });

      await child_process.exec('kill -15 `lsof -t -i:3000`',(err, stdout) =>{
        console.log('error: ', err);
        console.log('stdout: ', stdout);
      }).on('exit', code => {
        console.log('kill -15 `lsof -t -i:3000`');
        console.log('code: ', code);
      });

      await child_process.exec('npm run start',(err, stdout) =>{
        console.log('error: ', err);
        console.log('stdout: ', stdout);
      }).on('exit', code => {
        console.log('npm run start');
        console.log('code: ', code);
      });
    });
  }

  next();
});