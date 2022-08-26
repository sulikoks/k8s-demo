'use strict';
const express = require('express');
const packageJson = require('./package.json');

const app = express();

const IP = process.env.KUBERNETES_SERVICE_HOST;
const HOSTNAME = process.env.HOSTNAME;
const startTime = new Date().toISOString();
let requests = 0;

app.get('/andrey', (req, res) => {
  res.send({
    name: 'Andrey',
    sex: 'Male',
    old: 26,
  });
});

app.get('/hello', (req, res) => {
  console.log(req.query);
  res.send('Hello: \n Your query: ' + JSON.stringify(req.query));
});

app.get('/', (req, res) => {
  res.send(`
<div>
  <h2>Aaaaeee new Deployment by Suliko</h2>

  <div>Started: ${startTime}</div>
  <div>Total requests: ${requests++}</div>
  <div>IP: ${IP}</div>
  <div>HOSTNAME: ${HOSTNAME}</div>
  <div>Version ${packageJson.version}</div>
  <div>ENVTEST ${process.env.DEMO_GREETING}</div>
  <div>ENV ${JSON.stringify(process.env)}</div>
</div>
  `);
});

app.listen(3030, () => {
  console.log('App listen on port: 3030');
});
