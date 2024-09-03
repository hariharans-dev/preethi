const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    ChapterName: String,
    SectionName: String,
    Verse: String,
    Translation: String,
    KuralNumber: Number
},{ collection: 'KuralDetails' });
module.exports=mongoose.model("schema",schema);