const db = require('../../../models/db')
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


