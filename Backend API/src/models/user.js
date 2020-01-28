const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Note = require('./note')



const userSchema = new  mongoose.Schema({
    name:{
        type: String,
        trim:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true, 
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
             throw new Error("Email not valide")
        }
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:6,
        validate(value){
            if(value.toLowerCase().includes("password"))
            throw new Error("password can not contain password word")
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0)
             throw new Error("Age must be positive")
        }
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})
// Create virtual relationship
userSchema.virtual('notes',{
    ref:'notes',
    localField:'_id',
    foreignField:'owner'
})
// Create web token 
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}
// hide private data
userSchema.methods.toJSON =  function(){
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    delete userObj.avatar;
    return userObj;
}
//log in 
userSchema.statics.findByEmailAndPasswoed = async (email, password)=>{
    const user = await User.findOne({email});
    if(!user)
        throw new Error("Unable to login");
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
        throw new Error("Unable to login");
    return user;
}

// Hash passwordbefore saving it
userSchema.pre('save', async function(next){
  const user = this;
 if(user.isModified('password')){
     user.password = await bcrypt.hash(user.password, 8)
 }
    next()
})
// Remove tasks of deleted user
userSchema.pre('remove',async function(next){
    const user = this;
    await Note.deleteMany({owner: user._id})
})
const User = mongoose.model('user',userSchema) 

module.exports = User