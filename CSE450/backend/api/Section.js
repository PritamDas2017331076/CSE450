const express = require('express')
const router = express.Router();
const Section = require('../db/Section')

router.use(express.json())

router.route('/').get((req, res) => {
    Section.find()
        .then(section => res.json(section))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', async(req, res) => {
    const Section = new Section({...req.body });

    try {
        console.log(Section)
        await Section.save();
        res.status(200).send({ Section })
    } catch (e) {
        res.status(400).send(e);
    }
})



router.get('/:id', async(req, res) => {
    try {
        const Section = await Section.findById({ _id: req.params.id })
        if (!Section)
            return res.status(404).send()
        res.status(200).send(Section)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const Section = await Section.findByIdAndDelete(req.params.id)
        if (!Section)
            return res.status(404).send()
        res.status(200).send(Section)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router