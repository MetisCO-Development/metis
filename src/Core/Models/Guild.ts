import {Schema, model} from "mongoose"; 


const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: { 
        type: String, 
        required: true, 
        unique: true
    },
    guildName: { 
        type: String,
        required: true,
        unique: true
    },
    ownerId: { 
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        default: '!'
    }, 
    messageLogChannel: {
        type: String,
        default: ''
    }, 
    modLogChannel: { 
        type: String,
        default: ''
    }, 
    serverLogChannel: {
        type: String,
        default: ''
    }, 
    otherLogChannel: {
        type: String,
        default: ''
    }, 
    welcomeChannel: {
        type: String,
        default: ''
    }, 
    botCommander: {
        type: Array, 
        default: []
    }, 
    modRoles: {
        type: Array, 
        default: []
    }, 
    tags: [{
        name: String,
        content: String,
        createdBy: String,
        timestamp: String
    }],
    warnings: [{
         _id: Schema.Types.ObjectId,
         userId: String,
         username: String,
         moderatorID: String,
         moderatorUsername: String,
         reason: String,
         time: String
    }], 
    moderations: [{
        _id: Schema.Types.ObjectId,
        type: String,
        userId: String,
        username: String,
        moderatorID: String,
        moderatorUsername: String,
        duration: String,
        reason: String,
        time: String
    }],
    mid: { 
        type: Number, 
        default: 0,
        required: true,
        unique: true
    }
})

export default model('Guild', guildSchema, 'guilds')