
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
            })

            .createTable("roles", tbl => {
                tbl.increments()
                tbl.string("role_name", 30)
            })

            .createTable("volunteer_tasks", tbl => {
                tbl.increments();
                tbl.integer("user_id")
                    .references("users.id")
                    .notNullable()
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
                tbl.integer("task_id").notNullable()
                    .references("tasks.id")
                    .notNullable()
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
            })

            .createTable("tasks", tbl => {
                tbl.increments();
                tbl.varchar("task_name", 128)
                    .notNullable();
                tbl.varchar("task_description", 128)
                    .notNullable();
                tbl.date("due_date",128)
            })
};

exports.down = function(knex) {
    return knex.schema
            .dropTableIfExists("tasks")
            .dropTableIfExists("volunteer_tasks")
            .dropTableIfExists("roles")
            .dropTableIfExists("users")
            
};
