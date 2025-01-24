const mongoose = require('mongoose')

const sampleSchema = mongoose.Schema(
    {
        sampleName:{
            type:String,
            required: true,
        },
        sampleUploaderDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            default: null
        },
        sampleFile:{
            type: String, 
        },
        sampleFileDetails:{
            type: Object,
            default: {}
        },
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Sample", sampleSchema)