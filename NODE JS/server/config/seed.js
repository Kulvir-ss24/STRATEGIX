const User = require('../apis/user/userModel')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);



User.findOne({email:"admin@gmail.com"}).then(userData => {
    if(userData==null){
        let userData = {
            userId: 1,
            name: "Admin",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("123",salt),
            userType: 1
        }
        let user = new User(userData)
        user.save().then(res => {
            console.log("Admin created")
        }).catch(err => {
            console.log("Admin create err", err)
        })
    }
    else{
        console.log("Admin Already Exists");
    }
}).catch(err=>{
    console.log("Admin create err", err)
})


