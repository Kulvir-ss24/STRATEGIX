const User = require('../user/userModel')
const Material = require('../material/materialModel')
const Course = require('../course/courseModel')
const Quiz = require('../quiz/quizModel')


exports.dashboard = async (req, res) => {
    let totalStudents = await User.find({ userType: 2 })
    let totalNotes = await Material.find({ materialType: "NOTES" })
    let totalQuestionPapers = await Material.find({ materialType: "QUESTIONPAPERS" })
    let totalLabFiles = await Material.find({ materialType: "LABFILES" })
    let totalCourses = await Course.countDocuments()
    let totalQuizes = await Quiz.countDocuments()
    res.send({ success: true, status: 200, 
        totalCourses: totalCourses, 
        totalStudents: totalStudents.length, 
        totalNotes: totalNotes.length,
        totalQuestionPapers: totalQuestionPapers.length,
        totalLabFiles: totalLabFiles.length,
        totalQuizes: totalQuizes })
}

