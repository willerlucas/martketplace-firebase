const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

var path = require('path');
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'client/index.html'));
});


app.get('/api/mensagem', (req, res) => {
  res.send({ express: 'Teste de Programacao 4C' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
