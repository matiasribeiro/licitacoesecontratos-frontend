const express = require('express');
const app = express();
const appName = 'angular-licitacoesecontratos';
const outputPath = `${__dirname}/dist/${appName}`;
//seta o diretório de build para servir o Angular
app.use(express.static(outputPath));

app.get('/*', (req,res) => {
  res.sendFile(`${outputPath}/index.html`);
})

app.listen(process.env.PORT);

