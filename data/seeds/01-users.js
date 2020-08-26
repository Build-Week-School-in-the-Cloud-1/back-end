
exports.seed = function(knex) {
  // return knex('users').truncate()
  //   .then(function () {
      return knex('users').insert([
        {
          "fname": "Cane",
          "lname": "Candy",
          "email": "cane@gmail.com",
          "username": "candycane",
          "password": "$2a$14$d4WFdaIzIlm4/OWMX1Q1EunwURe3ttpr/9DbQb2xnfg3AnVCgXkPm",
          "country": "America",
          "role": "Volunteer",
          "bio": ";lskdjf;lksajdf;lkjasd;flkjasd;lkfj;asdlkjf;",
          "skill": "math",
          "volunteer_time": "time",
          "student_time": "time"
      },
      {
          "fname": "Jeff",
          "lname": "Tandy",
          "email": "jeff@gmail.com",
          "username": "Jeffff",
          "password": "$2a$14$Q1GBLGukNLA47CQ5SAhdTe4rgssdzUhEUDBeqJSIE1mh3oeHjKD1W",
          "country": "America",
          "role": "Volunteer",
          "bio": ";lskdjf;lksajdf;lkjasd;flkjasd;lkfj;asdlkjf;",
          "skill": "math",
          "volunteer_time": "time",
          "student_time": "time"
      },
      {
          "fname": "Judy",
          "lname": "Dirth",
          "email": "jdirth@gmail.com",
          "username": "Judyjudyjudy",
          "password": "$2a$14$6JjNihCP3/pykj/Bsbiqk.q7d.PUJ1pZtzpFllK68cYUrQiL1OTQe",
          "country": "America",
          "role": "Volunteer",
          "bio": ";lskdjf;lksajdf;lkjasd;flkjasd;lkfj;asdlkjf;",
          "skill": "math",
          "volunteer_time": "time",
          "student_time": "time"
      },
      {
        "fname": "Larry",
        "lname": "Longer",
        "email": "longer@gmail.com",
        "username": "llonger",
        "password": "$2a$14$6JjNihCP3/pykj/Bsbiqk.q7d.PUJ1pZtzpFllK68cYUrQiL1OTQe",
        "country": "America",
        "role": "Volunteer",
        "bio": ";lskdjf;lksajdf;lkjasd;flkjasd;lkfj;asdlkjf;",
        "skill": "english",
        "volunteer_time": "time",
        "student_time": "time"
      },
      {
        "fname": "Jennifer",
        "lname": "Steel",
        "email": "steel@gmail.com",
        "username": "JSTeel",
        "password": "$2a$14$6JjNihCP3/pykj/Bsbiqk.q7d.PUJ1pZtzpFllK68cYUrQiL1OTQe",
        "country": "Africa",
        "role": "Volunteer",
        "bio": ";lskdjf;lksajdf;lkjasd;flkjasd;lkfj;asdlkjf;",
        "skill": "social studies",
        "volunteer_time": "time",
        "student_time": "time"
      },
      {
        "fname": "Admin",
        "lname": "Admin",
        "email": "admin@gmail.com",
        "username": "admin",
        "password": "$2a$14$6JjNihCP3/pykj/Bsbiqk.q7d.PUJ1pZtzpFllK68cYUrQiL1OTQe",
        "country": "Canada",
        "role": "Admin",
        "bio": ";lskdjf;lksajdf;lkjasd;flkjasd;lkfj;asdlkjf;",
        "skill": "Admin",
        "volunteer_time": "time",
        "student_time": "time"
      }
      ]);
    // });
};
