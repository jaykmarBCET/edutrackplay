import { sequelize } from "@/connection/db.connection";
import { DataTypes } from "sequelize";

const Student = sequelize.define("student",{
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
        allowNull:true,
        validate:{
            min:3000000000,
            max:9999999999
        }
    },
    
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    score:{
        type:DataTypes.NUMBER,
        defaultValue:0,
    },
    isBlocked:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    parentId:{
        type:DataTypes.BIGINT,
        references:{
            model:"parent",
            key:'id',
        }
    },
    avatar:{
        type:DataTypes.STRING,
        validate:{
            isUrl:true,
        },
        allowNull:false
    },
    coverImage:{
        type:DataTypes.STRING,
        validate:{
            isUrl:true,
        },
        allowNull:false
    },
    cardId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    dob:{
        type:DataTypes.DATE,
        allowNull:false,
    },
},{
    timestamps:true,
    indexes:[
        {
            fields:['id', "email", "phone"],
            unique:true
        }
    ]
})


export {Student}