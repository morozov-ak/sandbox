const{Schema, model, Types}=require('mongoose')
const schema = new Schema({
    code:{type:String,required:true,unique:true},
    date:{type:Date,default:Date.now},
    owner:{type:Types.ObjectId,ref:'User'}
})
module.exports = model('Notes', schema)