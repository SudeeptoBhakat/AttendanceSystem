const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    UserName: String,
    Email: String,
    Phone: String,
    Subject: String,
    Password: String,
});

module.exports = mongoose.model('TeacherRegTbl', RegistrationSchema);
