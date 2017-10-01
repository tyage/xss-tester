import assert from 'assert';
import xssTester from '../src/index.js';

describe('simple xss tester', () => {
  it ('detect attack if alert is up', async () => {
    const url = 'http://localhost:3000/vuln?q=<script>alert(1)</script>';
    const result = await xssTester.test(url);
    assert.equal(result, false);
  });
});
