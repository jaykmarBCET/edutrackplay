import { sequelize } from "@/connection/db.connection";
import { DataTypes, Model, Optional} from 'sequelize'
import { CollegeInfo } from "../../types/types";

type CollegeCreationAttribute = Optional<CollegeInfo , "id" | "createdAt" | "updatedAt" >

const College = sequelize.define<Model<CollegeInfo, CollegeCreationAttribute>>("college",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrementIdentity:true,
        allowNull:false,
        unique:true,
    },
    title:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[20, 100]
        }
    },
    field:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[4, 50]
        }
    },
    owner_name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    owner_email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            len:[15 , 50],
            is:'/^[^\s@]+@[^\s@]+\.[^\s@]+$/'
        }
    },
    owner_phone:{
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
        validate:{
            is:"^[A-Za-z]{4}\d{4}[!@#$%^&*]{2}$" // abcd12345@
        }
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true,
        validate:{
            len:[80, 300]
        }
    },
    images:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true,
        validate:{
            isUrl:true,
        }
    },
    logo:{
        type:DataTypes.STRING,
        validate:{
            isUrl:true,
        },
        allowNull:false
    },
    phone:{
        type:DataTypes.NUMBER,
        validate:{
            min:3000000000,
            max:9999999999
        },
        allowNull:false,
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
    website:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            isUrl:true,
        }
    }
},{
    timestamps:true,
    indexes:[
        {
            unique:true,
            fields:['id', 'email','title', 'name','createdAt','updatedAt'],
        }
    ]
})


export {College}