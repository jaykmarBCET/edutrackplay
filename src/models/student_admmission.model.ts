import { sequelize } from "@/connection/db.connection";
import {StudentAdmissionRequestInfo} from '../../types/types'
import { Optional,Model, DataTypes } from "sequelize";

type StudentCreationAttribute = Optional<StudentAdmissionRequestInfo , "id" | "createdAt" | "updatedAt">
export const StudentAdmissionRequest = sequelize.define<Model<StudentAdmissionRequestInfo, StudentCreationAttribute>>("student_admission_request", {
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        unique:true,
    },
    studentId:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:"student",
            key:'id'
        }
    },
    collegeId:{
        type:DataTypes.BIGINT,
        references:{
            model:"college",
            key:"id"
        }
    },
    coachingId:{
        type:DataTypes.BIGINT,
        references:{
            model:"coaching",
            key:'id'
        }
    },
    field:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    stander:{
        type:DataTypes.NUMBER,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isAccept:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    reason:{
        type:DataTypes.STRING,
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:new Date(),
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:new Date()
    }
})