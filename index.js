const express = require('express');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.urlencoded({
  extended: true,
}));

app.use(BodyParser.json());

app.listen(2020, () => console.log('Example app listening on port 8080'));

app.post('/', request => {
  console.clear();
  console.log(request.body);

  next();
});