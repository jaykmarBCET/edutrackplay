import { sequelize } from "@/connection/db.connection";
import { DataTypes, Model, Optional } from "sequelize";
import { CollegeClassPricingInfo } from "../../types/types";

type CollegeClassPricingCreationAttribute = Optional<CollegeClassPricingInfo,"id" | "createdAt" | "updatedAt" >
const CollegeClassPricing = sequelize.define<Model<CollegeClassPricingInfo, CollegeClassPricingCreationAttribute>>("college_class_pricing",{
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
    collegeId:{
        type:DataTypes.NUMBER,
        allowNull:false,
        references:{
            model:'college',key:'id'
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
        type:DataTypes.NUMBER,
        allowNull:false
    }
},{
    timestamps:true,
    indexes:[
        {
            fields:['price', 'collegeId', 'stander']
        }
    ]
})


export {CollegeClassPricing}