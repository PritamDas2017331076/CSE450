let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
const DIR = './public/';
const Student = require('../db/Student');
const authStudent = require('../middleware/authStudent');
const auth = require('../middleware/authStudent')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 10;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.use(express.json())
router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/me', authStudent, async(req, res) => {
    try {
        res.status(200).send(req.student)
    } catch (e) {
        res.status(500).send()
    }
})

const nodemailer = require("nodemailer");
const config = require("../config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});

const ip = require('../ip')

const sendConfirmationEmail = (name, email, secret) => {
    console.log("Check ", secret, user, email, pass);
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `
        <html>
          <body>
            <h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <p>http://localhost:5000/approveS/${secret}</p>
          </body>
        </html>`,
    }).catch(err => console.log('errr ', err));
};


router.post('/add', upload.single('avatar'), async(req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const university = req.body.university;
    const department = req.body.department;
    const password = req.body.password;
    const post = 'student'
    const activated = false
    const registration_number = req.body.registration_number
    const session = req.body.session
    const status = false
    const secret = await jwt.sign({ email: email }, 'thisisnewstudent')
    const avatar = url + '/public/' + req.file.filename



    try {
        Student.findOne({ email: email }, function(err, student) {
            console.log('exist ', student);
            if (student) return
        })
    } catch {
        console.log('student is used')
    }

    const newStudent = new Student({ email, name, phone, secret, status, university, avatar, department, post, activated, password, registration_number, session });
    console.log(newStudent)

    try {
        await newStudent.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            console.log('sending mail')

            sendConfirmationEmail(
                newStudent.name,
                newStudent.email,
                newStudent.secret
            );
        })
        console.log('Student', newStudent)
        res.status(200).send(newStudent)
    } catch (e) {
        console.log(e.message)
        res.status(400).send(e);
    }
})

router.route('/login').post(async(req, res) => {
    try {
        console.log(req.body.email, req.body.password)
        const student = await Student.findByCredentials(req.body.email, req.body.password)
        if (student.activated == false) {
            res.status(400).send('Id is not activated')
            throw new Error('Id is not activated')
            return
        }
        const token = await student.generateAuthToken()
        const post = student.post
        const university = student.university
        const department = student.department
        const name = student.name
        const email = student.email
        const id = student._id
        const avatar = student.avatar
        console.log(student)
        res.status(200).send({ student, avatar, token, post, university, department, name, email, id })
    } catch (e) {
        res.status(400).json(e)
    }
})

// router.patch('/upload-photo', authStudent, uploads.single('avatar'), async(req, res) => {
//     const studen = req.student
//     if (!studen) res.status(403).send('student not found')
//     else {
//         try {
//             const photo = req.file.buffer
//             const image = await sharp(photo).metadata()
//             const avatar = await sharp(photo).resize(2, 2).toBuffer()
//             const ava = Buffer.from(avatar, 'binary')
//             console.log('iamhere')
//             console.log('avatar and student ', avatar, studen)
//             const chg = {
//                 avatar: ava
//             }
//             console.log('data to update', chg)
//             const student = Student.findByIdAndUpdate(studen._id, chg, { new: true, runValidators: true })
//             console.log(studen)
//             res.status(201).send(studen)
//         } catch (e) {
//             console.log('error occurred', e.message, studen)

//         }


//     }
// })

router.get('/logout', authStudent, async(req, res) => {
    console.log(req.student)
    try {
        req.student.tokens = req.student.tokens.filter(token => token.token !== req.token)
            //req.user.tokens = []
        await req.student.save();
        res.status(200).send(req.student)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async(req, res) => {
    console.log(req.params)
    try {
        const student = await Student.findById(req.params.id)
        if (!student)
            return res.status(404).send()
        res.status(200).send(student)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/:id', async(req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!student)
            return res.status(404).send()
        res.status(200).send(student)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


router.delete('/:id', async(req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        if (!student)
            return res.status(404).send()
        res.status(200).send(student)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router;