'use strict';
const express = require('express');
const packageJson = require('./package.json');

const app = express();

const IP = process.env.POD_IP;
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
  <div>DEMO_GREETING: ${process.env.DEMO_GREETING}</div>
  <div>DEMO_FAREWELL: ${process.env.DEMO_FAREWELL}</div>
</div>
  `);
});

app.listen(3030, () => {
  console.log('App listen on port: 3030');
});
