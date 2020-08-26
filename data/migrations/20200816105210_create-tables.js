
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
                tbl.increments();
                tbl.string("fname", 128)
                    .notNullable();
                tbl.string("lname", 128)
                    .notNullable();
                tbl.varchar("email", 128)
                    .notNullable()
                    .unique();
                tbl.varchar("username", 128)
                    .notNullable()
                    .unique();
                tbl.varchar("password", 128)
                    .notNullable();
                tbl.varchar("country", 128)
                    .notNullable();
                tbl.string("role", 128)
                    .notNullable();
                tbl.varchar('bio', 300);
                tbl.string('skill', 30);
                tbl.string('volunteer_time', 128);
                tbl.string('student_time', 128);
            })

            .createTable("tasks", tbl => {
                tbl.increments();
                tbl.varchar("task_name", 128)
                    .notNullable();
                tbl.varchar("task_description", 128)
                    .notNullable();
                tbl.boolean("completion", );
            })

            .createTable("volunteer_tasks", tbl => {
                tbl.increments();
                tbl.integer("user_id")
                    .unsigned()
                    .references("users.id")
                    .notNullable()
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                tbl.integer("task_id")
                    .unsigned()
                    .references("tasks.id")
                    .notNullable()
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                
            })

            
};

exports.down = function(knex) {
    return knex.schema
            .dropTableIfExists("volunteer_tasks")
            .dropTableIfExists("tasks")
            .dropTableIfExists("users")
            
};
