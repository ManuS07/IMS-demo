const db = require('../models/db')


db.Course.create(
    {
        course_name:"Fluid mechanics",
        branch:'civil',
        semester:'1',
        fees:'20000',
    }
)
db.Course.create(
    {
        course_name:"Solid mechanics",
        branch:'civil',
        semester:'1',
        fees:'20000',
    }
)

db.User.create({
    name:"Vijay",
    dob:"12-01-2000",
    phone:"14364237",
    role:"",
    address:"erhbgjhb",
    relation:""


})
db.User.create({
    name:"Suiya",
    dob:"12-01-2001",
    phone:"144237",
    role:"P",
    address:"erhbgsdb",
    relation:"F"


})

db.Student.create(
    {
        department:'Civil',
         semester:'2',
          user_id:1
    }
)
db.Parent.create({
     occupation:"Vevasayam", 
     relationship:"F",
      user_id:2
});
db.Mark.create({
    mark:20,
    user_id:1,
    course_id:1, 
    
});
db.Mark.create({
    mark:30,
    user_id:1,
    course_id:2, 
    
});
db.LoginCredentials.create({
    email:"ma@mail.com",
    password:"12334",
    user_id:1
     
});
db.LoginCredentials.create({
    email:"ab@mail.com",
    password:"19934",
    user_id:2
     
});

db.Feedback.create(
    {
        content:"Good",
        user_id:1
    }
)
db.Feedback.create(
    {
        content:"Bad",
        user_id:2
    }
) 