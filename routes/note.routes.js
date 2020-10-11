const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Note = require('../models/Notes')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', auth, async (req, res) => {
    try {
        const code = shortid.generate()
        const note = new Note({
            code, name: req.body.name, notetext: req.body.notetext, owner: req.user.userId
        })
        await note.save()
        res.status(201).json({ note })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так nen" })
    }
})




router.post('/save', auth, async (req, res) => {
    try {
        console.log("save:",req.body)
        let doc = await Note.findOneAndUpdate({ _id: req.body.noteNameId }, { name: req.body.noteNameEdit, notetext: req.body.noteTextEdit, shared:req.body.users });
        const noteToEdit = await Note.findById(req.body.noteNameId)
        res.json(noteToEdit)
    } catch (err) {
        res.status(500).json({ err })
    }
})

router.post('/deleteNote', auth, async (req, res) => {
    try {
        Note.findByIdAndDelete(req.body.noteNameId, function (err, docs) {
            if (err) {

            }

        });

        res.json(req.body.noteNameId)
    } catch (err) {

        res.status(500).json({ err })
    }
})



router.get('/notes', auth, async (req, res) => {
    console.log('/notes')
    try {
        //console.log('/notes try',req.user.userId)
        const notes = await Note.find({ owner: req.user.userId })
        //console.log('/notes try',notes)
        res.json(notes)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

router.get('/users',auth, async (req, res) => {
    console.log("/users")
    try {
        const users = await User.find({})
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})



router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        console.log(req.params.id)
        res.json(note)

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})
module.exports = router