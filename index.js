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
    chdir('../', () => {
      console.log('process.cwd: ', process.cwd());
    });

    /*

    child_process.exec('cd ..').on('exit', code => {
      console.log('code: ', code);
      console.log('cd ..');
    });

    */

    child_process.exec('ls',function(err, stdout){
      console.log(stdout);
    }).on('exit', code => {
      console.log('ls');
      console.log('code: ', code);
    });


    /*

    child_process.exec('cd nuxt-chat', (a, b, c) => {
      console.log(a, b, c);
    }).on('exit', code => {
      console.log('code: ', code);
      console.log('cd nuxt-chat');
    });

    child_process.exec('git pull && npm run build && pm2 reload nuxt-chat', (a, b, c) => {
      console.log(a, b, c);
    }).on('exit', code => {
      console.log('code: ', code);
      console.log('git pull && npm run build && pm2 reload nuxt-chat');
    });

    */
  }

  next();
});