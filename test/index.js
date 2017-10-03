import assert from 'assert';
import express from 'express';
import xssTester from '../src/index.js';

describe('simple xss tester', function() {
  this.timeout(5000);

  before(() => {
    const app = express();
    app.get('/reflected', (req, res) => {
      res.send(req.query.q);
    });
    app.get('/stored', (req, res) => {
      res.send('<script>alert(1);</script>');
    });
    app.listen(3000);
  });

  it ('detect stored xss if alert is up', async () => {
    const url = 'http://localhost:3000/stored';
    const result = await xssTester.checkPopup(url);
    assert.equal(result, true);
  });
  it ('detect reflected xss if alert is up', async () => {
    const url = 'http://localhost:3000/reflected?q=<script>alert(1)</script>';
    const result = await xssTester.checkPopup(url);
    assert.equal(result, true);
  });
  it ('detect reflected xss if prompt is up', async () => {
    const url = 'http://localhost:3000/reflected?q=<script>prompt(1)</script>';
    const result = await xssTester.checkPopup(url);
    assert.equal(result, true);
  });
  it ('detect reflected xss if confirm is up', async () => {
    const url = 'http://localhost:3000/reflected?q=<script>confirm(1)</script>';
    const result = await xssTester.checkPopup(url);
    assert.equal(result, true);
  });

  it ('pass normal response', async () => {
    const url = 'http://localhost:3000/reflected?q=some%20query';
    const result = await xssTester.checkPopup(url);
    assert.equal(result, false);
  });
});
