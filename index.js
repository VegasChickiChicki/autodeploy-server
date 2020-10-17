const express = require('express');
const BodyParser = require('body-parser');
const child_process = require('child_process');

const app = express();

app.use(BodyParser.urlencoded({
  extended: true,
}));

app.use(BodyParser.json());

app.listen(2020, () => console.log('Example app listening on port 2020'));

const data = {
  name: 'vegas',
  value: 256,
};

app.get('/', (req, res) => res.send(data));

app.post('/', request => {
  console.clear();
  console.log(request.body);

  child_process.exec('pm2 delete nuxt-prod');
});