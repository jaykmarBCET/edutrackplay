import { sequelize } from "@/connection/db.connection";
import { DataTypes, Model, Optional } from "sequelize";
import { CoachingStudentInfo } from "../../types/types";

type CoachingStudentCreationAttribute = Optional<CoachingStudentInfo ,"id" | "createdAt" | "updatedAt" >

const CoachingStudent = sequelize.define<Model<CoachingStudentInfo, CoachingStudentCreationAttribute>>('coaching_student',{
    id:{
        type:DataTypes.STRING,
        autoIncrement:true,
        primaryKey:true
    },
    rollNumber:{
        type:DataTypes.NUMBER,
        allowNull:false,
        unique:true
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


export {CoachingStudent}