import { sequelize  } from "@/connection/db.connection";
import { DataTypes, Model, Optional } from "sequelize";
import { ClassInfo } from "../../types/types";

type ClassCreationAttribute = Optional<ClassInfo ,"id" | "createdAt" | "updatedAt">
const Class = sequelize.define<Model<ClassInfo , ClassCreationAttribute>>("class",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    stander:{
        type:DataTypes.NUMBER,
        allowNull:false,
        validate:{
            len:[0 , 20]
        }
    },
    field:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[3 , 50]
        }
    },
    studentId:{
        type:DataTypes.NUMBER,
        allowNull:false,
        references:{
            model:"student",key:'id'
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
            model:'coaching',
            key:"id"
        }
    },
    session:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true,
    indexes:[
        {
            fields:['id','collegeId','studentId','coachingId'],
            unique:true
        }
    ]
})

sequelize.authenticate()


export {Class}