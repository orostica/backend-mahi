//Arquivo onde configuramos as rotas
//importar bibliotecas
const express = require('express');

const connection = require('./database/connections');
const EmpController = require('./controllers/EmpController');
const EmpSessionController = require('./controllers/EmpSessionController');
const UserSessionController = require('./controllers/UserSessionController');
const UserController = require('./controllers/UserController');
const JobsController = require('./controllers/JobsController');

const routes = express.Router();

//Todas as Rotas editar

//Rota de Login
routes.post('/EmpSessions',EmpSessionController.create)
routes.post('/UserSessions',UserSessionController.create)


//Rota para trazer dados
routes.get('/employers' , EmpController.index);
routes.get('/users' , UserController.index);
routes.get('/totalUsers' , EmpController.countUsers);
routes.get('/totalValues' , EmpController.sumValues);
routes.get('/usersTo' , UserController.indexTo);
routes.get('/jobs', JobsController.indexJobs);
routes.get('/latestUsers' , EmpController.lastUsers);
routes.get('/latestJobs' , EmpController.lastJobs);
routes.get('/latestJobsAll' , UserController.lastJobsForUser);

//rota para guardar dados no banco
routes.post('/employers', EmpController.create);
routes.post('/users', UserController.create);
routes.post('/mail', EmpController.sendmail);
routes.post('/jobs', JobsController.create);

//Update
routes.put('/users', UserController.update);
routes.put('/employers', EmpController.update);
routes.put('/jobs', JobsController.update);

//Update de senha
routes.put('/empPass', EmpController.updatePassword);
routes.put('/userPass', UserController.updatePassword);

//Exclusão de conta
routes.put('/empRemove', EmpController.exclude);
routes.put('/userRemove', UserController.exclude);

//Deletar
routes.delete('/jobs/:id', JobsController.delete);

//Exportas as rotas
module.exports = routes;