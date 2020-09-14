//Cadastro de Usuarios
const connection = require('../database/connections');
const crypto = require('crypto');

//Exportar objeto
module.exports = {

    async index(request,respose){

        const jobs = await connection('job').select('*');
        
        return respose.json(jobs);
        
        },

        async indexJobs(request,response){
        const employer_id = request.headers.authorization;
        //Paginação limitada a 5
        const { page = 1 }  = request.query;

        //Contagem de dados
        const [count] = await connection('job').count();

        const jobs = await connection('job')       
        .join('employer', 'employer.id', '=' , 'job.employer_id')
        // .limit(5)
        .offset((page - 1) * 5)
        .select([
            'job.id',
            'job.title',
            'job.description',
            'job.value',
            'job.active']).where('employer_id', employer_id);

        //Retornar a contagem no cabeçalho
        response.header('X-Total-Count',count['count(*)']);

        return response.json(jobs);
     },

    async create(request,response){
        const {title,description, value} = request.body;
        const employer_id = request.headers.authorization;
        const active = 's';

            const [id] = await connection('job').insert({
                title,
                description,
                value,
                employer_id,
                active
            });

            return response.json({id});     
    },

    async update(request,response){

        const {id, title,description, value} = request.body;
        
        const update = await connection('job')
        .where('id',id)
        .update({
            title,
            description,
            value
        });

    return response.json('Job Atualizado');
    },

    async delete(request,response){
        const {id} = request.params;
        const employer_id = request.headers.authorization;

        const job = await connection('job').where('id',id).select('employer_id').first();

        //Verificaçao
        if(job.employer_id != employer_id){
            return response.status(401).json({error: 'Operação não Permitida.'});
            
        }

        //Resposta
        await connection('job').where('id',id).delete();

        return response.status(204).send();
    }
}