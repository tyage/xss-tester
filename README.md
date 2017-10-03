# XSS Tester

Check if XSS PoC is passed.

It is useful to test PoCs as below.

```
http://localhost:3000/reflected?q=<script>alert(1)</script>
http://localhost:3000/reflected?q=<script>prompt(1)</script>
http://localhost:3000/reflected?q=<script>confirm(1)</script>
```
