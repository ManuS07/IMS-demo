const JWT = require('jsonwebtoken');
const db = require('../models/db')

const tokenKey = "mykey";

module.exports.getmark = function (req, res, next) {
    db.Mark.findOne({ where: { course_id: '2', user_id: '1' } }).then((results) => {
        db.Course.findOne({ where: { course_id: results.dataValues.course_id } }).then(response => {
            res.write('mark is : ' + results.dataValues.mark + "\n");
            res.write('subject is : ' + response.dataValues.course_name + "\n");
            res.write('Department is : ' + response.dataValues.branch);
            res.end()
        }
        )
    })

};



module.exports.login = function (req, res, next) {
    let studentData = {
        email: "ab@mail.com",
        password: "19934"
    }
    let parentData = {
        email: "ma@mail.com",
        password: "12334"
    }

    let token;

    db.LoginCredentials.findOne({
        where:
            { email: studentData.email }
    }).then(result => {
        if (result.dataValues.password == studentData.password) {
            db.User.findByPk(result.dataValues.user_id).then(resu => {
                if (resu.dataValues.role == 'S') {
                    res.write("student")
                    token = JWT.sign(
                        {
                            user_id: result.dataValues.user_id,
                            role: 'S'
                        },
                        tokenKey
                    )
                    console.log(token);
                    res.end()
                }
                else if (resu.dataValues.role == 'P') {
                    res.write("Parent")
                    token = JWT.sign(
                        {
                            user_id: result.dataValues.user_id,
                            role: 'P'
                        },
                        tokenKey
                    )
                    console.log(token);
                    res.end()
                }
                else if (resu.dataValues.role == 'A') {
                    res.write("admin")
                    token = JWT.sign(
                        {
                            user_id: result.dataValues.user_id,
                            role: 'A'
                        },
                        tokenKey
                    )
                    console.log(token);
                    res.end()
                }
            })

        }
        else {
            res.send("incorrect");
        }
    })
        .catch(err => {
            res.send("User not found");
        })
}


module.exports.viewStudentDetails = function (req, res, next) {
    let studentData = {
        email: "ab@mail.com",
        password: "19934"
    }
    let parentData = {
        email: "ma@mail.com",
        password: "12334"
    }

    let recievedTokendData = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiUyIsImlhdCI6MTY3MTIxNDk3Nn0.BJoNiq47nERx3318cZUn8_Gv5mfDbMZaiQ_GNWJQcPM'

    let tokenData = JWT.verify(recievedTokendData, tokenKey);
    console.log(tokenData);

    const data = {
        fname:'',
        dob:'',
        phone:'',
        address:'',
        department:'',
        email:'',
        semester:''
    };
    if(tokenData.role=="S"){
    db.User.findByPk(tokenData.user_id).then(result => {
        data.fname = result.dataValues.name;
        data.dob = result.dataValues.dob;
        data.phone = result.dataValues.phone;
        data.address = result.dataValues.address;
        db.Student.findOne({ where: { user_id: tokenData.user_id } }).then(resul => {
            data.department = resul.dataValues.department;
            data.semester = resul.dataValues.semester;
            db.LoginCredentials.findByPk(tokenData.user_id).then(resu => {
                data.email = resu.dataValues.email;
                res.send(data)
            })
        })
        
    });}
    else {
        console.log("error");
        res.end();
    }
    
}


module.exports.update = function(req, res, next) {

    let recievedTokendData = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiUyIsImlhdCI6MTY3MTIxNDk3Nn0.BJoNiq47nERx3318cZUn8_Gv5mfDbMZaiQ_GNWJQcPM'

    let tokenData = JWT.verify(recievedTokendData, tokenKey);

    let data = {
        phonenumber: "9791835158",
        cEmail:"Abishek@gamil.com",
        addressR:"393, erode main road, kodumudi, erode",
        password: "1111111"
    }

    db.User.update({
        phone:data.phonenumber,
        address:data.addressR
    },{where: {user_id:tokenData.user_id}}).then((results)=>{
        db.LoginCredentials.update({email:data.cEmail, password:data.password},{where:{user_id:tokenData.user_id}}).then((response) =>{
          res.send("Set uh")  
        })
    }).catch((err) =>{
        res.send("error");
    })
};


module.exports.viewFeedback = function(req, res,next){
    let recievedTokendData = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJyb2xlIjoiUyIsImlhdCI6MTY3MTIxNDk3Nn0.BJoNiq47nERx3318cZUn8_Gv5mfDbMZaiQ_GNWJQcPM'

    let tokenData = JWT.verify(recievedTokendData, tokenKey);
    console.log(tokenData);
    db.Feedback.findOne({where:{user_id:tokenData.user_id}}).then(result =>{
        db.User.findOne({where:{user_id:result.dataValues.user_id}}).then(resul =>{
            res.write("name : " + resul.dataValues.name +"\n");
            res.write("role : " + resul.dataValues.role +"\n");
            res.write("feedback : " + result.dataValues.content);
            res.end()

        })
    })


}