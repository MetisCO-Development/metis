import {Metis as metis} from "../main"; 
import {ApplicationCommandPermissions} from "eris";
const config = require('../../config.json'); 
let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
let logDate = new Date().toLocaleDateString(); 

metis.client.on('ready', async () => { 
    metis.client.editStatus('online', {name: `!help | ${metis.client.guilds.size} guilds`, type: 0 })
    metis.client.createCommand({
        name: 'ping', 
        description: 'Pings the bot.', 
        type: 1, 
        defaultPermission: true
    })
    metis.logger.success('Metis', `${metis.client.shards.size} Shards Connected [ALL]`, 'Shard Manager')
})
    
 
 