const express = require('express')
const router = express.Router();
const Section = require('../db/Section')

router.use(express.json())

router.route('/').get((req, res) => {
    Section.find()
        .then(section => res.json(section))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/cid').get((req, res) => {
    const course_id = req.query.course_id
    Section.find({ course_id: course_id })
        .then(section => res.json(section))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/cids').get((req, res) => {
    const course_id = req.query.course_id
    const section = req.query.section
    Section.find({ course_id: course_id, section: section })
        .then(section => res.json(section))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', async(req, res) => {
    const section = new Section({...req.body });

    try {
        console.log(section)
        await section.save();
        res.status(200).send({ section })
    } catch (e) {
        res.status(400).send(e);
    }
})



router.get('/:id', async(req, res) => {
    try {
        const section = await Section.findById({ _id: req.params.id })
        if (!section)
            return res.status(404).send()
        res.status(200).send(section)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id)
        if (!section)
            return res.status(404).send()
        res.status(200).send(section)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router