const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

//exportar para os aqruivos que precisam de conexao com o banco
module.exports = connection;    