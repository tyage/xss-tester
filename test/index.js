import assert from 'assert';
import express from 'express';
import xssTester from '../src/index.js';

describe('simple xss tester', function() {
  this.timeout(5000);

  before(() => {
    const app = express();
    app.get('/reflected', (req, res) => {
      console.log(req.query);
      res.send(req.query.q);
    });
    app.get('/stored', (req, res) => {
      res.send('<script>alert(1)</script>');
    });
    app.listen(3000);
  });

  it ('detect stored xss when alert up', async () => {
    const url = 'http://localhost:3000/stored';
    const result = await xssTester.test(url);
    assert.equal(result, false);
  });
  it ('detect reflected xss when alert up', async () => {
    const url = 'http://localhost:3000/reflected?q=<script>alert(1)</script>';
    const result = await xssTester.test(url);
    assert.equal(result, false);
  });
});
