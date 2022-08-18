const express = require('express')
const router = express.Router();
const Course = require('../db/Course')

router.use(express.json())

router.route('/').get((req, res) => {
    Course.find()
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', async(req, res) => {
    const Course = new Course({...req.body });

    try {
        console.log(Course)
        await Course.save();
        res.status(200).send({ Course })
    } catch (e) {
        res.status(400).send(e);
    }
})



router.get('/:id', async(req, res) => {
    try {
        const Course = await Course.findById({ _id: req.params.id })
        if (!Course)
            return res.status(404).send()
        res.status(200).send(Course)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const Course = await Course.findByIdAndDelete(req.params.id)
        if (!Course)
            return res.status(404).send()
        res.status(200).send(Course)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router