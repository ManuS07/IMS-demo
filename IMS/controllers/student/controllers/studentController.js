const db = require('../../../models/db')

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