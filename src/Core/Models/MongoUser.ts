import {Schema, model, Model, Document} from "mongoose"; 

const userSchema = new Schema({
    userID: { 
        type: String, 
        unique: true,
        index: true
    },
    username: String,
    isBlacklisted: Boolean, 
    ownedGuilds: [{
        guildId: String,
        guildName: String,
    }]
})

export interface MongoUser { 
    userID: String, 
    username: String, 
    isBlacklisted: Boolean, 
    ownedGuilds: [{
        guildId: String, 
        guildName: String
    }]
}
export interface MongoUserDoc extends Document, MongoUser{}
export interface MongoUserModel extends Model<MongoUserDoc>{}
export default model<MongoUserDoc>('user', userSchema, 'users')
