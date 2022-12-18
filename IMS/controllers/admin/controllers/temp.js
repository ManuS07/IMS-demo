// check if user already exists
const userExists = await Login.findOne({ where: { email: email } });
if (userExists) {
  return (
    res
      .status(400)
      // .json(new ResponseModel(null, null, ["User already exists."]));
      .json({ data: "Already exists" })
  );
}

console.log(req.user);

let password = firstName + "@1234";

const login = await Login.create({
  email: email,
  password: password,
  role: "s",
});

let id = Login.dataValues.id;
console.log(id);
if (login) {
  res.json({ data: login });
}

const student = await Student.create({
  firstName,
  lastName,
  email,
  phone,
  dob,
  gender,
  bloodGroup,
  address,
  class_12,
  class_10,
  entranceScore,
  loginId: id,
});

if (student) {
  res.json({ data: student });
  // redirect to parent form
}
} catch (err) {
console.log(err);
// res.status(500).json(new ResponseModel(null, null, ['Unable to create user.']));
}
};

const createParent = async (req, res) => {
try {
const {
  fatherName,
  motherName,
  email,
  phone,
  fatherOccupation,
  motherOccupation,
  address,
} = req.body;

const password = fatherName + "@1234";

const login = await Login.create({
  email: email,
  password: password,
  role: "p",
});
if (login) {
  res.json({ data: login });
}

const parent = await Parent.create({
  fatherName,
  motherName,
  email,
  phone,
  fatherOccupation,
  motherOccupation,
  address,
});

if (parent) {
  res.json({ data: parent });
  // redirect to Admin dashboard or view that student details
}
} catch (err) {
console.log(err);
// res.status(500).json(new ResponseModel(null, null, ['Unable to create user.']));
}