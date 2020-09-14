exports.up = function(knex) {
    return knex.schema.createTable('job', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();       
        table.string('value').notNullable();
        table.string('employer_id').notNullable();
        table.foreign('employer_id').references('id').inTable('employer')
        table.string('active').notNullable();
        table.timestamps();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('job');
};
