//Cadastro de Usuarios
const connection = require('../database/connections');
const crypto = require('crypto');
const { update } = require('../database/connections');

//Exportar objeto
module.exports = {

    async index(request,respose){

        const users = await connection('user').where('active','s').select('*');
        
        return respose.json(users);
        
        },

        async indexTo(request,response){

        const { page = 1, busca }  = request.query;

        if(busca){

            const [count] = await connection('user').count();

            const users = await connection('user').where('knowledge','like',`%${busca}%`)       
            .offset((page - 1) * 5)
            .select([
                'user.name',
                'user.email',
                'user.course',
                'user.knowledge',
                'user.phone',
                'user.state',
                'user.city',
                'user.status']);
    
            //Retornar a contagem no cabeçalho
            response.header('X-Total-Count',count['count(*)']);
    
            return response.json(users);
        }

        //Contagem de dados
        const [count] = await connection('user').count();

        const users = await connection('user')       
        .offset((page - 1) * 5)
        .select([
            'user.name',
            'user.email',
            'user.course',
            'user.knowledge',
            'user.phone',
            'user.state',
            'user.city',
            'user.status']);

        //Retornar a contagem no cabeçalho
        response.header('X-Total-Count',count['count(*)']);

        return response.json(users);
            },

    async create(request,response){
        const {password,name, email, cpf, course, knowledge, phone, state, city,active='s', status} = request.body;
        

        const [id] = await connection('user').insert({
            password,
            name,
            email,
            cpf,
            course,
            knowledge,
            phone,
            state,
            city,
            active,
            status
        });

    return response.json({name});
    },

    async update(request,response){

        const {id, password,name, email, cpf, course, knowledge, phone, state, city,active='s',status} = request.body;
        
        await connection('user')
        .where('id',id)
        .update({
            password,
            name,
            email,
            cpf,
            course,
            knowledge,
            phone,
            state,
            city,
            active,
            status
        });

        const emp = await connection('user').where('id',id).select('name','course','city','state', 'email','phone','knowledge','status').first();
    
        return response.json(emp);
    },
    async updatePassword(request,response){

        const {id, password} = request.body;
        
        await connection('user')
        .where('id',id)
        .update({
            password
        });
    
        return response.json('Updated');
    },

    async disableUser(request,response){

        const {id, active} = request.body;
        
        await connection('user')
        .where('id',id)
        .update({
            active
        });
    
        return response.json('Updated');
    },

    async lastJobsForUser(request, response){

     
        //Paginação limitada a 5
        const jobs = await connection('job')       
        .join('employer', 'employer.id', '=' , 'job.employer_id')
        // .limit(5)
        .limit(10)
        .select([
            'job.title',
            'job.description',
            'job.value',
            'job.active']).orderBy('job.id','desc')

        return response.json(jobs);

    },
    async updatePassword(request,response){
        const {id, password, confirmPassword} = request.body;
    
        if(password != confirmPassword){
             return response.json('As senhas não Conferem');
        }else
        //salvar dados no banco
        await connection('user')
        .where('id',id)
        .update({
            password,
        })  
        return response.json('Senha Atualizada');
        },

        async exclude(request,response){
            const {id} = request.body;

            const active = 'n';
        
            await connection('user')
            .where('id',id)
            .update({
                active,
            })  
            return response.json('Conta Desativada');
            },
}