# Edu Track Pay
---
**In this we build college management project which manage college fee, event,attendance student also manage coaching**
___
 ## Fetuares
    - college fee payment
    - coaching fee payment
    - student and teacher attendance manage
    - event manages(registration fee, free registration)
    - addmision (college and coaching)
    - college or coaching rating
 ## Backend structure
 - controllers
 - models<br>
     > ### Student 
     (id , rollNumber, gender , address , email, phone , password collegeId, studentId, classId,avatar , converImage, parentId, cardId, dob createdAt , updatedAt )
     <br> 
     > ### Parent 
     (id , name , gender , address , email ,phone , age , password , isVerifeid ,otp, createdAt , updatedAt)
     <br>
     > ### College 
     (id , title , name , address , email , phone , field ,ownerDeatils attribute,password, description,images ,logo, website , createdAt, updatedAt)
     <br>
     > ### Coaching
      (id , address, field , title , name , owner Deatils attribute, password,description, imagees,logo,phone,email, website, createdAt , updatedAt)
     <br>
     > ### Class 
     (id , name , stander , field , studentId, collegeId, coachingId, session, createAt, updatedAt)
     <br>
     > #### Coaching_Class_Pricing 
     (id , price , coachingId, stander,createAt, updatedAt)
     <br>
     > ### College_Class_pricing 
     (id , price ,collegeId , stander, createdAt , updatedAt)
     <br>
     >### Coaching_Fee_PaymentByStudent 
     (id , transcationId, studentId , coachingId, classId,price,coachingClassPricingId, status)
     <br>
     > ### College_fee_paymentBy_student 
     (id , transcationId, stundetId, collegeId , classId , price , coachingClassPricingId, status , createdAt , updatedAt)
     <br>
     > ### College_Student 
     (id , rollNumber, collegeId, studentId , classId, createdAt , updatedAt)
     <br>
     > ### StudentAdmissionRequest
     (id , studentId, coachingId, collegeId, stander, description,title, field, reason , isAccept)

 - connections
 - utility
 - routes
   > ## Student.route.js 
   - In this route we define student account which include CRUD (Create, Retrive, Update, Delete), Recovery Account, forget account password
   > ## College.route.js
   - In this route we define college account which include CRUD (Create, Retrive, Update, Delete), Recovery Account, forget account password
   > ## Coaching.route.js
   - In this route we define coaching account which include CRUD (Create, Retrive, Update, Delete), Recovery Account, forget account password
   > ## Parent.route.js
   - In this route we define parent account which include CRUD (Create, Retrive, Update, Delete), Recovery Account, forget account password
   > ## College.fee.payment.route.js
   - In this route we manage all college payment activity including student fee and teacher fee
   > ## Coaching.fee.payment.route.js
   - In this route we manage all coaching free including student and teacher
 - middleware
   - in this we define middleware which authorized our system to protect account,payment ...etc
   > ## authParent.js || authStudent || authCollege || authCoaching
   - this used to protect our account
 - server
  


 <html>
     <style>
      h1{
        background-color: rgb(60, 60, 196);
        box-shadow: 1px 1px 5px 1px  #aaaa67;
        text-align: center;
      }
      p{
        background-color: white;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 20px;
        border-radius: 10px;
        color: black;
        text-align: center;
      }
     </style>
    <h1 >Frontend Structure</h1>
    <h2>App</h2>
      <pre>
          App
            - pages
              --Home
              --Dashboard
              --login
      </pre>

 </html>