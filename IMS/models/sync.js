const { Course, Feedback, Mark, User, Student, Parent, LoginCredentials } = require("./db");



Course.sync();
User.sync();
Student.sync();
Parent.sync();
LoginCredentials.sync();
Feedback.sync();
Mark.sync();