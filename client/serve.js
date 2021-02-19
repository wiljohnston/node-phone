const express = require('express')
const path = require('path')
const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});