const connection = require('../database/connections');
const crypto = require('crypto');
const { update } = require('./JobsController');
const nodemailer = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');

//Exportar objeto
module.exports = {

    async index(request,respose){

        const emps = await connection('employer').where('active','s')
        .select('*');

        return respose.json(emps);
        
        },

    async create(request,response){
    const {name, password, description, state, city,active='s'} = request.body;

    //Gerar id aleatorio
    const id = crypto.randomBytes(4).toString('HEX');

    //salvar dados no banco
    await connection('employer').insert({
        id,
        password,
        name,
        description,
        state,
        city,
        active
    })  

    return response.json({id});
    },

    async update(request,response){
        const {id,name, password, description, state, city} = request.body;
    
        //salvar dados no banco
        await connection('employer')
        .where('id',id)
        .update({
            password,
            name,
            description,
            state,
            city
        })  

        const emp = await connection('employer').where('id',id).select('name','description','city','state').first();
    
        return response.json(emp);
        },

        async sendmail(request,response){

            const {mensagem, remetente, destinatario} = request.body;
        
            let transporter = nodemailer.createTransport({

                host:"SMTP.office365.com",
                port: 587,
                secure: false,             
                auth:{
                    user:mail,
                    pass:mailpass
                }         
            }) ;

            await transporter.sendMail({
                from:`mahi <${mail}>`,
                to:destinatario,
                subject:`Contato do Empregador ${remetente}`,
                text:mensagem
            }).then(message =>{
                console.log(message)
            }).catch(err =>{
                console.log(err)
            })

            return response.json('Email Enviado');

        },

        async countUsers(request,response){
            //Contagem de dados
            const [count] = await connection('user').count();
            return response.json(count['count(*)']);
                },

        async sumValues(request,response){
        const employer_id = request.headers.authorization;
                    //Contagem de dados
        const [sum] = await connection('job').sum('value').where('employer_id', employer_id);
        return response.json(sum['sum(`value`)']);
    },
    async lastUsers(request, response){

        const users = await connection('user')       
        .select([
            'user.name',
            'user.status']).orderBy('user.id','desc');

        return response.json(users);

    },
    async lastJobs(request, response){

        const employer_id = request.headers.authorization;
        //Paginação limitada a 5
        const jobs = await connection('job')       
        .join('employer', 'employer.id', '=' , 'job.employer_id')
        // .limit(5)
        .limit(6)
        .select([
            'job.title',
            'job.description',
            'job.value',
            'job.active']).where('employer_id', employer_id).orderBy('job.id','desc');

        return response.json(jobs);

    },

    async updatePassword(request,response){
        const {id, password, confirmPassword} = request.body;
    
        if(password != confirmPassword){
             return response.json('As senhas não Conferem');
        }else
        //salvar dados no banco
        await connection('employer')
        .where('id',id)
        .update({
            password,
        })  
        return response.json('Senha Atualizada');
        },
        async exclude(request,response){
            const {id} = request.body;

            const active = 'n';
        
            await connection('employer')
            .where('id',id)
            .update({
                active,
            })  
            return response.json('Conta Desativada');
            },
}