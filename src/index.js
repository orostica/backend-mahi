//Importar funcionalidades do express
const express = require('express');

//Importar as rotas do arquivo de rotas
const routes = require('./routes');

//Import do cors
const cors = require('cors');

//Variavel que armazena a aplicação
const app = express();

//Usar o cors
app.use(cors());
//Tornar o json entendivel para a aplicação
app.use(express.json());
//Usar o arquivo de rotas
app.use(routes);

app.listen(3333);