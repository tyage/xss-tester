import assert from 'assert';
import express from 'express';
import xssTester from '../src/index.js';

describe('simple xss tester', () => {
  before(() => {
    const app = express();
    app.get('/vuln', (req, res) => {
      console.log(req.query);
      res.send(req.query.q);
    });
    app.listen(3000);
  });

  it ('detect attack if alert is up', async () => {
    const url = 'http://localhost:3000/vuln?q=<script>alert(1)</script>';
    const result = await xssTester.test(url);
    assert.equal(result, false);
  });
});
