//Login de usuario
const connection = require('../database/connections');

module.exports = {

    async create(request,response){
        const {cpf,password} = request.body;

        const usr = await connection('user').where('cpf',cpf).where('password',password).where('active','s').select('id','name',
        'email',
        'cpf',
        'course',
        'knowledge',
        'phone',
        'state',
        'city',
        'status').first();

        if(!usr){
            return response.status(400).json({error: 'Usuario não Encontrado'})
        }

        return response.json(usr);
    }
}