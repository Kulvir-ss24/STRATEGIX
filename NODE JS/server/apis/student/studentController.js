const Student = require('./studentModel')
const User = require('../user/userModel')
const helper = require('../../utilities/helpers')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')

exports.getAll = async (req, resp) => {
    // req.body.userType = 2
    await Student.find(req.body)
    .populate('userId')
    .populate('courseId')
    .populate('branchId')
    .then(res => {
        resp.send({ success: true, status: 200, message: "All Students loaded", data: res })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })
}



exports.getSingle = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })

    let query = { userId: formData._id }
    await Student.findOne(query)
    .populate('userId')
    .populate('courseId')
    .populate('branchId')
    .then(res => {
        if (!!res) {
            resp.send({ success: true, status: 200, message: "Student loaded Successfully", data: res })
        }
        else
            resp.send({ success: false, status: 404, message: "No Student Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })
}




exports.addStudent = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.rollNo)
        validation += "rollNo is required,"
    if (!formData.contact)
        validation += "contact is required,"
    if (!formData.email)
        validation += "email is required,"
    if (!formData.password)
        validation += "password is required,"
    if (!formData.courseId)
        validation += "courseId is required,"
    // if (!formData.branchId)
    //     validation += "branchId is required,"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await User.countDocuments()
        let UserData = {
            userId: total + 1,
            name: formData.name,
            email: formData.email,
            password: bcrypt.hashSync(formData.password, salt),
            userType: 2
        }
        let user = new User(UserData)
        let prevUser = await User.findOne({ email: formData.email })
        if (prevUser)
            resp.send({ success: false, status: 409, message: "User already exists with same email" })
        else
            user.save().then(async res => {
                let total = await Student.countDocuments()
                let student = new Student()
                
                    student.studentId= total + 1
                    student.name= formData.name
                    student.rollNo= formData.rollNo
                    student.contact= formData.contact
                    student.email= formData.email
                    student.password= bcrypt.hashSync(formData.password, salt)
                    student.courseId= formData.courseId
                    if (!!formData.branchId)
                        student.branchId= formData.branchId
                    student.userId= res._id
               
                
                student.save().then(studentRes=>{
                    resp.send({ success: true, status: 200, message: "Student added Successfully", data: studentRes})
                }).catch(err => {
                    resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }

}


exports.updateStudent = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await User.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.name)
                    res.name = formData.name
                if (!!formData.email)
                    res.email = formData.email
                if (!!formData.password)
                    res.password = bcrypt.hashSync(formData.password, salt)
                // if (!!formData.status)
                //     res.status = formData.status
                let id = res._id
                let prevUser = await User.findOne({ $and: [{ email: res.email }, { _id: { $ne: id } }] })
                if (prevUser)
                    resp.send({ success: false, status: 409, message: "User already exists with same email" })
                else
                    res.save().then(res => {
                        Student.findOne({userId:formData._id}).then(studentData=>{
                            if(!!studentData){
                                if (!!formData.name)
                                    studentData.name = formData.name
                                if (!!formData.email)
                                    studentData.email = formData.email
                                if (!!formData.password)
                                    studentData.password = bcrypt.hashSync(formData.password, salt)
                                if (!!formData.rollNo)
                                    studentData.rollNo = formData.rollNo
                                if (!!formData.contact)
                                    studentData.contact = formData.contact
                                if (!!formData.courseId)
                                    studentData.courseId = formData.courseId
                                if (!!formData.branchId)
                                    studentData.branchId = formData.branchId
                                else
                                    studentData.branchId = null
                                studentData.save().then(studData=>{
                                    resp.send({ success: true, status: 200, message: "User updated Successfully", data: studData })
                                }).catch(err => {
                                    resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                                })
                            }
                            else
                                resp.send({ success: false, status: 404, message: "No User Found" })
                        })
                        

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No User Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }

}

exports.changeStatus = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!formData.status)
        validation += "status is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await User.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Student Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Student Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}