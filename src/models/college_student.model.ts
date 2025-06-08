import { sequelize } from "@/connection/db.connection";
import { DataTypes } from "sequelize";


const CollegeStudent = sequelize.define('college_student',{
    id:{
        type:DataTypes.STRING,
        autoIncrement:true,
        primaryKey:true
    },
    rollNumber:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    collegeId:{
        type:DataTypes.BIGINT,
        references:{
            model:'college',
            key:'id'
        },
        allowNull:false,
    },
    studentId:{
        type:DataTypes.BIGINT,
        references:{
            model:'student' , key:'id'
        },
        allowNull:false,
    },
    classId:{
        type:DataTypes.BIGINT,
        references:{
            model:'class',key:'id'
        },
        allowNull:false
    }
},{
    timestamps:true
})


export {CollegeStudent}