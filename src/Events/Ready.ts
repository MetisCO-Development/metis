import {Metis} from "../main"; 
const config = require('../../../config.json'); 
let logDate = new Date().toLocaleDateString(); 
let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'}); 

class ReadyHandler { 
    name: string;
    constructor(){
        this.name = 'ready';
    }

    async handle(this: Metis): Promise<void> { 
        this.editStatus('online', {name: '!help', type: 0})

        this.executeWebhook('1043789410006740995', config.readyWebhook, { 
            embeds: [
                {
                    color: this.green, 
                    description: `\`${logDate}  ${logTime}\` <@!${this.user.id}> [CONNECTED] Shard: \`1\``
                }
            ]
        })

        this.logger.success('Metis', `[${logTime}] Connected to Discord!`)
    }
}

export default new ReadyHandler; 