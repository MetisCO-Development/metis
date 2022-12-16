import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 
let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
let logDate = new Date().toLocaleDateString(); 

metis.client.on('ready', async () => { 
    metis.client.editStatus('online', {name: `!help | ${metis.client.guilds.size} guilds`, type: 0 })

    metis.client.executeWebhook('1043789410006740995', config.readyWebhook, { 
        embeds: [{
            color: metis.colors.green,
            description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [ALL SHARDS READY]`
        }]
    })

    metis.logger.success('Metis', `All ${metis.client.shards.size} Shards Connected`, 'Shard Manager')
})
    
 
 