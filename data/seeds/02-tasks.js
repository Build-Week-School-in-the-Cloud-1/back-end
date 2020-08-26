
exports.seed = function(knex) {
  // return knex('tasks').truncate()
  //   .then(function () {
      return knex('tasks').insert([
        {
          "task_name": "Be awesome at everything",
          "task_description": "Go to lambdaschool schools and completet the Javascript portion",
          "completion": false
        },
        {
          "task_name": "Build awesome stuff",
          "task_description": "Learn things... then do things",
          "completion": false
        },
        {
          "task_name": "Eat Meat",
          "task_description": "Go to store, buy meat, and eat meat.",
          "completion": false
        }
      ]);
    // });
};
