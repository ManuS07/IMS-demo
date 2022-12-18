// admin controller
const db = require('../../../models/db')

module.exports.create = async (req, res) => {
    res.json({ data: "This is the form" })
}
// student register function
module.exports.createPost = async (req, res) => {
    try {
        const {
            name,
            dob,
            phone,
            role,
            address,
            relation,
            email,
            password,
            department,
            semester,
            occupation,
            relationship
        } = req.body;

        const userExists = await db.LoginCredentials.findOne({ where: { email: email } });
        if (userExists) {
            return (
                res
                    .status(400)
                    // .json(new ResponseModel(null, null, ["User already exists."]));
                    .json({ data: "Already exists" })
            );
        }


        const user = await db.User.create({
            name,
            dob,
            phone,
            role,
            address,
            relation,
        });
        if (user) {
            db.LoginCredentials.create({
                email,
                password,
                role,
                user_id: user.dataValues.user_id

            });
            db.Student.create({
                department,
                semester,
                user_id: user.dataValues.user_id
            });
            db.Parent.create({
                occupation,
                relationship,
                user_id: user.dataValues.user_id
            });
            res.json({ data: "Success" })

        }

    } catch (err) {
        console.log(err);
    }
};

