const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/DBTeacher',{
    UseNewUrlParser: true
}).then(()=>{
    console.log('Database Connected...')
}).catch((err)=>{
    console.log(err)
})
require('./resgiter.model')