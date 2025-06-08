import { sequelize } from "@/connection/db.connection";
import { DataTypes } from "sequelize";

const CoachingFeePaymentByStudent = sequelize.define("coaching_fee_payment_by_student",{
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
    coachingId:{
        type:DataTypes.STRING,
        references:{
            model:'coaching',key:'id'
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
    coachingClassPricingId:{
        type:DataTypes.BIGINT,
        allowNull:false,
        references:{
            model:'coaching_class_pricing',
            key:'id'
        }
    },
    status:{
        type:DataTypes.ENUM,
        values:["Payment failed", "Payment Pending", "Payment Successfully"],
        defaultValue:'Payment Pending'
    }
},{
    timestamps:true
})

export {CoachingFeePaymentByStudent}