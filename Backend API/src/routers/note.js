const express = require('express')
const Note = require('../models/note')
const authMiddleware = require('../middleware/auth')
const router = new express.Router()

router.post('/notes',authMiddleware,async(req,res)=>{
    const owner = req.user._id;
    const newNote = new Note({
        ...req.body,
        owner
    })
    try {
       await newNote.save()
       res.status(201).send(newNote);
    } catch (error) {
        res.status(500).send(error) 
    } 
   })
   
   router.get('/notes',authMiddleware,async(req,res)=>{
    const match ={}
    const sort = {}
    if(req.query.favourite)
          match.isfavourite = req.query.favourite === 'true'

    if(req.query.sortBy){
    const parts= req.query.sortBy.split(':')
    sort[parts[0]] = parts[1]==='desc' ? -1 : 1 ;
    }
       try {
        await req.user.populate({
            path:'notes',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.notes);
        } catch (error) {
            res.status(500).send(error) 
        } 
   
   })
   router.get('/notes/count',authMiddleware,async(req,res)=>{
    const _id = req.user._id;
    counts = {all:0,isfavourite:0}
    try {
     await Note.countDocuments({ owner:_id }, function (err, count) {
        counts.all = count;
      });
      await Note.countDocuments({ owner:_id, isfavourite:true }, function (err, count) {
        counts.isfavourite = count;
      });
        res.send(counts)
    } catch (error) {
        res.status(500).send() 
    }
})
   
   router.get('/notes/:id',authMiddleware,async(req,res)=>{
       const _id = req.params.id;
   
       try {
        const note = await Note.findOne({_id , owner:req.user._id})
           if(!note){
              return res.status(404).send()
           }
           res.send(note)
       } catch (error) {
           res.status(500).send() 
       }
   })
   router.patch('/notes/:id',authMiddleware, async (req, res) => {
       const updates = Object.keys(req.body)
       const allowedUpdates = ['title', 'body','isfavourite']
       const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
   
       if (!isValidOperation) {
           return res.status(400).send({ error: 'Invalid updates!' })
       }
   
       try {
        const note = await Note.findOne({ _id: req.params.id, owner: req.user._id})
        updates.forEach(update => note[update] = req.body[update]);
        await note.save()
   
           if (!note) {
               return res.status(404).send()
           }
   
           res.send(note)
       } catch (e) {
           res.status(400).send(e)
       }
   })
   router.delete('/notes/:id',authMiddleware, async (req, res) => {
       try {
           const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
   
           if (!note) {
               res.status(404).send()
           }
   
           res.send(note)
       } catch (e) {
           res.status(500).send()
       }
   })
   module.exports = router