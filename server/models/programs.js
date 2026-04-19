import mongoose from 'mongoose'

const ProgramSchema= mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    id: {type: String},
     donatedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

// User is a model/collection
export default mongoose.model('Program', ProgramSchema)