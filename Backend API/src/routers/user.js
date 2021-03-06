const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const router = new express.Router()
const authMiddleware = require('../middleware/auth')
const sendEmail = require('../emails/accounts')

router.post('/users',async(req,res) => {
    const newUser = new User(req.body);
    try {
       await newUser.save()
       sendEmail.sendWelcomeEmail(newUser.email,newUser.name)
       const token = await newUser.generateAuthToken();
       res.status(201).send({newUser,token});
    } catch (error) {
        res.status(500).send(error) 
    }    
})
router.post('/users/login', async (req, res)=>{
    try {
        console.log(req.body.email, req.body.password)
        const user = await User.findByEmailAndPasswoed(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user , token});
    } catch (error) {
        res.status(400).send({ErrorA:error});
    }
})
router.post('/users/logout',authMiddleware,async(req , res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>token.token !== req.token);
        await req.user.save();
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
// router.post('/users/logoutAll',authMiddleware,async(req , res)=>{
//     try{
//         req.user.tokens = [];
//         await req.user.save();
//         res.send()
//     }catch(e){
//         res.status(500).send()
//     }
// })
router.get('/users/me',authMiddleware, async(req, res) => {
    res.send(req.user)
  })

router.patch('/users/me',authMiddleware, async (req, res) => {
const updates = Object.keys(req.body)
const allowedUpdates = ['name', 'email', 'password', 'age']
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
}

try {
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
} catch (e) {
    res.status(400).send(e)
}
})
router.delete('/users/:id',authMiddleware, async (req, res) => {
try {
    await req.user.remove()
    sendEmail.sendOnDeletingEmail(req.user.email,req.user.name)
    res.send(req.user)
} catch (e) {
    res.status(500).send()
}
})

//Upload user avatar
const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
     if(!file.originalname.match(/\.(jpg|png|jpeg)$/))
       return cb(new Error('You must profide a Picture .jpg .png .jpeg'))
       cb(undefined,true)
    }
})
router.post('/users/me/avatar',authMiddleware,upload.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer;
    await req.user.save()
    res.send()
},
(error, req, res, next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar' , authMiddleware , async(req,res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
 const user = await User.findById(req.params.id);
   try{
        if(!user || !user.avatar)
            throw new Error()
        res.set('Content-Type','image/png');
        res.send(user.avatar)
   }
   catch(e){
         res.status(400).send()
   }
})
module.exports = router