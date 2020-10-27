const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Note = require('../models/Notes')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()
const _ = require('lodash')

router.post('/create', auth, async (req, res) => {
    try {
        const code = shortid.generate()
        const note = new Note({
            code, name: req.body.name, notetext: req.body.notetext, owner: req.user.userId,shared:[]
        })
        await note.save()
        res.status(201).json({ note })

    } catch (e) {
        res.status(500).json(e)
    }
})




router.post('/save', auth, async (req, res) => {
    try {
        console.log("saving")
        let doc = await Note.findOneAndUpdate({ _id: req.body.noteNameId }, { name: req.body.noteNameEdit, notetext: req.body.noteTextEdit, shared: [...req.body.users] });
        const noteToEdit = await Note.findById(req.body.noteNameId)
        console.log("saved:", noteToEdit)
        res.json(noteToEdit)
    } catch (err) {
        console.log("err",err)
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
    try {
        const notes = await Note.find({ owner: req.user.userId })
        res.json(notes)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})

router.get('/shared_notes', auth, async (req, res) => {
    try {
        const notes = await Note.find({ shared:req.user.userId })
        res.json(notes)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})






router.get('/users', auth, async (req, res) => {
    try {
        console.log(req.user.userId)
        
        const users = await User.find({})
        
        console.log(_.findIndex(users, {id:req.user.userId}))
        users.splice(_.findIndex(users, (user)=>{return user._id==req.user.userId}),1)
        //console.log(users)
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})



router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.json(note)

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
})
module.exports = router