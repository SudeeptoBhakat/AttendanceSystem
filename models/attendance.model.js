const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    Email: String,
    date: String
});

module.exports = mongoose.model('TeacherAttendanceTbl', AttendanceSchema);
