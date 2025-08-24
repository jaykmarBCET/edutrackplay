

// endpoint
export const AllRoot = {
    //Parent
    ParentRegister : "/api/account/parent",
    ParentLogin : "/api/account/parent/login",
    ParentLogout: "/api/account/parent/logout",
    ParentUpdate: "/api/account/parent",
    ParentGet : "/api/account/parent",
    ParentGetChildren: "/api/account/parent-children",
    ParentAddChildren : "/api/account/parent-children",

    //Student
    StudentRegister: "/api/account/student",
    StudentLogin : "/api/account/student/login",
    StudentLogout: "/api/account/student/logout",
    StudentUpdate: "/api/account/student",
    StudentGet: "/api/account/student",
    StudentDelete:"/api/account/student",

    // College 
    CollegeRegister : "/api/account/college",
    CollegeLogin: "/api/account/college/login",
    CollegeLogout: "/api/account/college/logout",
    CollegeUpdate: "/api/account/college",
    CollegeGet : "/api/account/college",
    CollegeDelete : "/api/account/college",
    // college-class-pricing
    CollegeClassPricingCreate:"/api/college-class-pricing",
    CollegeClassPricingUpdate:"/api/college-class-pricing",
    CollegeClassPricingGet:"/api/college-class-pricing",
    CollegeClassPricingDelete:"/api/college-class-pricing",
    // Student-admission-request
    StudentAdmissionRequestForCollegeCreate:"/api/student-admission-request",
    StudentAdmissionRequestForCollegeGet:"/api/student-admission-request",
    StudentAdmissionRequestForCollegeUpdate:"/api/student-admission-request",
    StudentAdmissionRequestForCollegeDelete:"/api/student-admission-request",
    // Student Admission request College reaction
    StudentAdmissionRequestAndCollegeGet:"/api/student-admission-request/college-reaction",
    StudentAdmissionRequestForCollegeReaction:"/api/student-admission-request/college-reaction",
    // Student Class Payment
    StudentFeePaymentOfClassGet:"/api/student-admission-request/college-reaction/student-reaction",
    StudentFeePaymentOfClassPrePay:"/api/student-admission-request/college-reaction/student-reaction",

    // College-list
    CollegeListGet:"/api/college-list",
    // College Price by College id for student
    CollegeClassPricingByCollegeId:"/api/college-class-pricing/class-pricing-by-college-id"
}