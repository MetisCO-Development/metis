import {Metis} from "../main"; 
const config = require('../../config.json'); 
let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
let logDate = new Date().toLocaleDateString(); 

class ReadyHandler { 
    name: string; 
    constructor(){
        this.name = "ready";
    }
    
    async handle(this: Metis): Promise<void> { 
        this.editStatus("online", {name: `!help | ${this.guilds.size} guilds`})

        this.executeWebhook('1043789410006740995', config.readyWebhook, { 
            embeds: [{
                color: this.green, 
                description: `\`${logDate}  ${logTime}\` <@!${this.user.id}> [CONNECTED] Shard: \`1\``
            }]
        })

        return this.logger.success('Metis', 'Metis has connected to Discord!', 'Ready Event')
    }
}

export default new ReadyHandler;