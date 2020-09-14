
exports.up = function(knex) {
    return knex.schema.createTable('employer', function(table){
        table.string('id').primary();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();       
        table.string('state').notNullable();
        table.string('city').notNullable();
        table.string('active').notNullable();
        table.timestamps();
              
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('employer');
};
