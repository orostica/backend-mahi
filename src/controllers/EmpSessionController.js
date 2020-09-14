//Login da empresa
const connection = require('../database/connections');

module.exports = {

    async create(request,response){
        const {id, password} = request.body;

        const emp = await connection('employer').where('id',id).where('password',password).where('active','s').select('name','description','city','state').first();

        if(!emp){
            return response.status(400).json({error: 'Empresa Não Encontrada'})
        }
        
        return response.json(emp);
    }
}