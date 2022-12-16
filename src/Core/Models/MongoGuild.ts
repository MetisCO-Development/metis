import {Schema, model, Model, Document} from "mongoose"; 


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
    },
    ownerId: { 
        type: String,
    },
    owner: {
        type: String,
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
   modRoles: Array,
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
})

export interface MongoGuild { 
    guildId: string 
    guildName: string 
    ownerId: string 
    owner: string 
    prefix: string 
    messageLogChannel: string 
    modLogChannel: string 
    serverLogChannel: string 
    otherLogChannel: string 
    welcomeChannel: string 
    modRoles: Array<string>
    tags: [{
        name: String,
        content: String,
        createdBy: String,
        timestamp: String
    }]
    warnings: [{
        _id: Schema.Types.ObjectId,
        userId: String,
        username: String,
        moderatorID: String,
        moderatorUsername: String,
        reason: String,
        time: String
    }]
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
    }]
}
export interface MongoGuildDoc extends Document, MongoGuild{}
export interface MongoGuildModel extends Model<MongoGuildDoc>{}
export default model<MongoGuildDoc>('guild', guildSchema, 'guilds')