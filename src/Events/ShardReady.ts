import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 
let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
let logDate = new Date().toLocaleDateString();

metis.client.on('shardReady', async (id: Number)=> { 

    metis.logger.success('Metis', `Shard ${id} Connected`, 'Discord Connection')
    metis.client.executeWebhook('1043789410006740995', config.readyWebhook, { 
        embeds: [{
            color: metis.colors.green,
            description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [SHARD READY] Shard: \`${id}\``
        }]
    })

})