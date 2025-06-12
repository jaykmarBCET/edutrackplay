import { sequelize } from "@/connection/db.connection";
import { DataTypes, Model, Optional } from "sequelize";
import { CoachingClassPricingInfo } from "../../types/types";

type CoachingClassPricingCreationAttribute = Optional<CoachingClassPricingInfo,"id" | "createdAt" | "updatedAt" >
const CoachingClassPricing = sequelize.define<Model<CoachingClassPricingInfo, CoachingClassPricingCreationAttribute>>("coaching_class_pricing",{
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
    },
    duration:{
        // in days
        type:DataTypes.NUMBER,
        allowNull:false,
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