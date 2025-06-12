import { sequelize } from "@/connection/db.connection";
import { DataTypes, Model, Optional } from "sequelize";
import { CollegeFeePaymentByStudentInfo } from "../../types/types";

type CollegeFeePaymentByStudentCreationAttribute = Optional<CollegeFeePaymentByStudentInfo, "id" | "createdAt" | "updatedAt">

const CollegeFeePaymentByStudent = sequelize.define<Model<CollegeFeePaymentByStudentInfo,CollegeFeePaymentByStudentCreationAttribute>>("college_fee_payment_by_student",{
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    transactionId:{
        type:DataTypes.STRING,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    studentId:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:"student",key:'id'
        }
    },
    collegeId:{
        type:DataTypes.STRING,
        references:{
            model:'college',key:'id'
        },
        allowNull:false
    },
    classId:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:"class",
            key:'id'
        }
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0
    },
    collegeClassPricingId:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:'college_class_pricing',
            key:'id'
        }
    },
    expireDuration:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM,
        values:["Payment failed", "Payment Pending", "Payment Successfully"],
        defaultValue:'Payment Pending'
    }
},{
    timestamps:true
})

export {CollegeFeePaymentByStudent}