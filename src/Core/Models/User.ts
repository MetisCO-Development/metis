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
export default model('User', userSchema, 'users')