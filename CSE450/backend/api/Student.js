const express = require('express')
const router = express.Router();
const Student = require('../db/Student');
const authStudent = require('../middleware/authStudent');
const auth = require('../middleware/authStudent')

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


router.post('/add', async(req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const session = req.body.session;
    const password = req.body.password;

    try {
        Student.findOne({ user: user }, function(err, student) {
            console.log(student);
            123456

            if (student) console.log('fine one lol')
                /* if (err) return res.redirect('/signupform') */

            if (student) {
                console.log('just stop it')
                console.log('This student is used')
                return
            }
        })
    } catch {
        console.log('student is used')
    }

    const newStudent = new Student({ user, email, session, password });
    console.log(newStudent)

    try {
        const token = await newStudent.generateAuthToken();
        console.log('token', token)
        res.status(200).send({ newStudent, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.route('/login').post(async(req, res) => {
    try {
        const student = await Student.findByCredentials(req.body.user, req.body.password)
        const token = await student.generateAuthToken()
        console.log(student)
        res.status(200).send({ student, token })
    } catch (e) {
        res.status(400).json(e)
    }
})

router.get('/logout', authStudent, async(req, res) => {
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