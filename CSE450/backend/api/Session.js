const express = require('express')
const router = express.Router();
const Session = require('../db/Session')

router.use(express.json())

router.route('/').get((req, res) => {
    Session.find()
        .then(session => res.json(session))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', async(req, res) => {
    const Session = new Session({...req.body });

    try {
        console.log(Session)
        await Session.save();
        res.status(200).send({ Session })
    } catch (e) {
        res.status(400).send(e);
    }
})



router.get('/:id', async(req, res) => {
    try {
        const Session = await Session.findById({ _id: req.params.id })
        if (!Session)
            return res.status(404).send()
        res.status(200).send(Session)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const Session = await Session.findByIdAndDelete(req.params.id)
        if (!Session)
            return res.status(404).send()
        res.status(200).send(Session)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router