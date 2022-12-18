const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize("test","root","rootpassword",{
    host: 'localhost',
    dialect: 'mysql',
 });

 const Course = sequelize.define('Course',{

    course_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    course_name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    branch:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    semester:{
        type:DataTypes.STRING(1),
        allowNull:false
    },
    fees:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
 });

 const User = sequelize.define('User',{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    dob:{
        type: DataTypes.STRING(10),
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    role:{
        type: DataTypes.STRING(1),
        allowNull:false
    },
    address:{
        type: DataTypes.TEXT,
        allowNull:false  
    },
    relation:{
        type: DataTypes.STRING(1),
        allowNull:true
    }
 });

const Student = sequelize.define('Student',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        
    },
    department:{
        type: DataTypes.STRING(10),
        allowNull:false
    },
    semester:{
        type: DataTypes.STRING(2),
        allowNull:false
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: "user_id"
        }
    }

})
const Parent = sequelize.define('Parent',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    occupation: {
        type:DataTypes.STRING(20),
        allowNull: false
    },
    relationship:{
        type:DataTypes.STRING(10),
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: "user_id"
        }
    }
    
})
const LoginCredentials = sequelize.define('LoginCredentials',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    email:{
        type:DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: "user_id"
        }
        
    }
});
const Feedback = sequelize.define('Feedback', {
    feedback_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: "user_id"
        }
        
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

const Mark = sequelize.define('Mark',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    mark:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: "user_id"
        },
        
    },
    course_id:{
        type: DataTypes.INTEGER,
        references:{
            model: Course,
            key: "course_id"
        }
       
    }
    

});



User.hasOne(Student,{
    foreignKey:"user_id",
    sourceKey:"user_id"
});
Student.belongsTo(User,{
    foreignKey:"user_id",
    targetKey:"user_id"

})

User.hasOne(Parent,{
    foreignKey:"user_id",
    sourceKey:"user_id"
});
Parent.belongsTo(User,{
    foreignKey:"user_id",
    targetKey:"user_id"

})
User.hasOne(LoginCredentials,{
    foreignKey:"user_id",
    sourceKey:"user_id"
});
LoginCredentials.belongsTo(User,{
    foreignKey:"user_id",
    targetKey:"user_id"

})

User.hasMany(Feedback, {
    foreignKey:"user_id",
    sourceKey:"user_id"
})
Feedback.belongsTo(User,{
    foreignKey:"user_id",
    targetKey:"user_id"
});

User.hasMany(Mark,{
    foreignKey:"user_id",
    sourceKey:"user_id"
})
Mark.belongsTo(User,{
    foreignKey:"user_id",
    targetKey:"user_id"
});

Course.hasMany(Mark, {
    foreignKey:"course_id",
    sourceKey:"course_id"
});
Mark.belongsTo(Course,{
    foreignKey:"course_id",
    targetKey:"course_id"
});

module.exports.sequelize = sequelize;

module.exports = {
    User,
    LoginCredentials,
    Student,
    Parent,
    Mark,
    Course,
    Feedback

}


 