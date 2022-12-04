import {Schema, model} from "mongoose"; 

const userSchema = new Schema({
    id: String,
    username: String,
    isBlacklisted: Boolean, 
    ownedGuilds: [{
        guildId: String,
        guildName: String,
    }]
})
module.exports = model('User', userSchema, 'users')