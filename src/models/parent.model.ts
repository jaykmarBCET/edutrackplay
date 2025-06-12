import { sequelize } from "@/connection/db.connection";
import { DataTypes, Model, Optional } from "sequelize";
import { ParentInfo } from "../../types/types";

type ParentCreationAttribute = Optional<ParentInfo,"id" | "createdAt" | "updatedAt">

const Parent = sequelize.define<Model<ParentInfo, ParentCreationAttribute>>("parent",{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
    },
    name:{
        type:DataTypes.STRING,
        validate:{
            len:[5, 50]
        },
        allowNull:false,
    },
    gender:{
        type:DataTypes.ENUM,
        allowNull:false,
        values:["Female","Male"],
        defaultValue:"Male"
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[20, 100]
        }
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            len:[15 , 50],
            is:'/^[^\s@]+@[^\s@]+\.[^\s@]+$/'
        }
    },
    phone:{
        type:DataTypes.NUMBER,
        unique:true,
        allowNull:false,
        validate:{
            min:3000000000,
            max:9999999999
        }
    },
    age:{
        type:DataTypes.SMALLINT,
        allowNull:false,
        validate:{
            min:14,
            max:70
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    otp:{
        type:DataTypes.NUMBER,
        
    }
    
},{
    timestamps:true,
    indexes:[
        {
            fields:['id', "email", "phone"],
            unique:true
        }
    ],
    defaultScope:{
        attributes:{exclude:["password"]}
    },
    scopes:{
        withPassword:{
            attributes:{include:["password"]}
        }
    }
})


export {Parent}

/**
 * note if any student have no parent that time first create student account as parent account then student account
 * 
 */