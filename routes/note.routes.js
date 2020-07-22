const{Router}=require('express')
const config = require('config')
const shortid = require('shortid')
const Note = require('../models/Notes')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create',auth, async(req,res)=>{
    try{
        console.log(req.body)
        const code = shortid.generate()
        const  note = new Note({
            code, name:req.body.name, notetext:req.body.notetext, owner: req.user.userId
        })
        console.log('note',note)
        await note.save()
        res.status(201).json({note})

    }catch(e){
        res.status(500).json({message:"Что-то пошло не так nen"})
    }
})

router.get('/notes',auth,async(req,res)=>{
    try{
        console.log('Запрос поиска')
        const notes=await Note.find({owner:req.user.userId})
        res.json(notes)
    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})

router.get('/:id',async(req,res)=>{
    try{
        console.log('req.params.id',req.params.id)
        const note=await Note.findById('5ee5e1c7b4a4890ae02ace8f')

        //const note=await Note.findById(req.params.id)
        res.json(note)  

    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})
module.exports=router