const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post('/query/string', (req, res) => {
  const query = req.body.query;
  console.log('Received query:', query);
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Received query string: ' + query);
});

app.post('/query/rule-object', (req, res) => {
  const ruleObject = req.body.ruleObject;
  console.log('Received rule object:', ruleObject);
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Received rule object: ' + JSON.stringify(ruleObject));
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
