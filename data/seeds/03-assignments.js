
exports.seed = function(knex) {
  // return knex('volunteer_tasks').truncate()
  //   .then(function () {
      return knex('volunteer_tasks').insert([
        {
          "user_id":"1",
          "task_id":"3"
        },
        {
          "user_id":"2",
          "task_id":"2"
        },
        {
          "user_id":"3",
          "task_id":"1"
        }
      ]);
    // });
};
