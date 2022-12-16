import {Schema, model, Model, Document} from "mongoose"; 

const globalSchema = new Schema({
    blacklistedUsers: [{
        username: String,
        userId: String,
        reason: String,
        date: String,
    }],
    blacklistedServers: [{
        guild: String,
        guildId: String,
        reason: String,
        date: String,
        owner: String,
        ownerId: String
    }]

})

export interface MongoGlobal { 
    blacklistedUsers: [{
        username: String,
        userId: String,
        reason: String,
        date: String,
    }]
    blacklistedServers: [{
        guild: String,
        guildId: String,
        reason: String,
        date: String,
        owner: String,
        ownerId: String
    }]
}
export interface MongoGlobalDoc extends Document, MongoGlobal{}
export interface MongoGlobalModel extends Model<MongoGlobalDoc>{}
export default model<MongoGlobalDoc>('global', globalSchema, 'globalDB')