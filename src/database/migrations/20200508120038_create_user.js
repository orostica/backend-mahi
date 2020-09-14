
exports.up = function(knex) {

    return knex.schema.createTable('user', function(table){
        table.increments();
        table.integer('cpf').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('name').notNullable();
        table.string('course').notNullable();
        table.string('knowledge').notNullable();
        table.string('phone').notNullable();
        table.string('state').notNullable();
        table.string('city').notNullable();
        table.string('active').notNullable();
        table.string('status').notNullable();
        table.timestamps();
              
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
