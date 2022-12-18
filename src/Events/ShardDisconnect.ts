import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 
let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
let logDate = new Date().toLocaleDateString();  

metis.client.on('shardDisconnect', async (err: Error, id: Number) => { 

    metis.client.executeWebhook(config.readyWebhookID, config.readyWebhook, { 
        embeds: [{
            color: metis.colors.red,
            description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [SHARD DISCONNECT] Shard: \`${id}\`\n${err.name ?? "1005"}" ${err.message ?? "Restart Shard"}`
        }]
    })
})