const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  if(req.protocol != 'https'){
    res.status(301).redirect('https://www.demos-web.com')
  }else if(req.protocol == 'https'){
    next();
  }
});

app.use(express.static(__dirname));

app.get('*',(req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'))

});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});