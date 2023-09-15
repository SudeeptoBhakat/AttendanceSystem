require('./models/db')
const express = require("express")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const teachers = require('./models/resgiter.model')
const doa = require('./models/attendance.model')
const bodyparser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))

app.use(cookieParser());
 
app.use(session({
    secret: "magic",
    saveUninitialized: true,
    resave: true
}));

app.get('/', (req, res)=>{
    res.render('registration', { msg: '' })
})

app.post('/teacherdata',(req, res)=>{
    console.log(req.body)
    const teacher = new teachers(req.body);
    const email = req.body.Email; 
    const query = { Email: email }; 

    teachers.find(query).then((result) => {
        if (result.length === 0) {
            teacher.save().then((result) => {
                console.log('Data Saved..');
                res.render('registration', { msg: 'true' });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            res.render('registration', { msg: 'false' });
        }
    });
})

app.get('/login', (req, res)=>{
    res.render('login', { msg: '' })
})

app.get('/attendence', (req, res)=>{
    var email = req.session.email
    var username = req.session.username
    var phone = req.session.phone
    var subject = req.session.subject
    var day = req.session.day
    res.render('attendence', {email: email, username: username, phone: phone, subject: subject, day: day})
})

app.post('/checkdata', (req, res) => {
    const { email, password } = req.body;
    const query = { Email: email, Password: password };
    req.session.email = email;

    teachers.find(query).then((result) => {
        console.log({ 'Result:': result });
        if (result.length !== 0) {
            req.session.username = result[0].UserName;
            req.session.phone = result[0].Phone;
            req.session.subject = result[0].Subject;

            res.redirect('/attendence');
        } else {
            res.redirect('/login', { msg: 'false' });
        }
    }).catch((err) => {
        console.log(err); 
        res.render('login', { msg: 'false' });
    });
});


app.post('/attendenc', (req, res)=>{
    console.log(req.body)
    const teacheratt = new doa(req.body)
    email = req.session.email
    findobj = {Email: email}
    const day = []
    teacheratt.save().then((result)=>{
            console.log('Attendence successfully given');
            doa.find(findobj).then((result)=>{
                console.log(result)
                result.forEach(element => {
                    day.push(element.date)
                });
                console.log(day)
                req.session.day = day
                res.redirect('/attendence')
            })
        }).catch((err)=>{
            console.log(err)
        })
    })
    
app.get('/logout', (req, res)=>{
    req.session.destroy();
    res.render('logout')
})


app.listen(3000, ()=>{
    console.log("Server Running at 3000");
}) 
