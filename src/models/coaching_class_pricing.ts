import { sequelize } from "@/connection/db.connection";
import { DataTypes } from "sequelize";

const CoachingClassPricing = sequelize.define("coaching_class_pricing",{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,

    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false,
        validate:{
            max:300000
        }
    },
    coachingId:{
        type:DataTypes.NUMBER,
        allowNull:false,
        references:{
            model:'coaching',key:'id'
        }
    },
    stander:{
        type:DataTypes.NUMBER,
        allowNull:false,
        validate:{
            max:20,
            min:1
        }
    }
},{
    timestamps:true,
    indexes:[
        {
            fields:['price', 'coachingId', 'stander']
        }
    ]
})


export {CoachingClassPricing}