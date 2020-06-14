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

router.get('/',auth,async(req,res)=>{
    try{
        const notes=await Note.find({owner:req.user.userId})
        res.json(Notes)
    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id)
        res.json(note)  

    }catch(e){
        res.status(500).json({message:"Что-то пошло не так"})
    }
})
module.exports=router