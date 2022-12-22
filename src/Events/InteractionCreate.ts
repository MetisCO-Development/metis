import {CommandInteraction, Interaction} from "eris";
import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 

metis.client.on('interactionCreate', async (interaction: Interaction) => { 
    if(interaction instanceof CommandInteraction){
        switch(interaction.data.name) { 
            case "ping": 
                let now = Date.now()
                let ping = { 
                    embeds: [{
                        color: metis.colors.blue, 
                        description: `${metis.emotes.info} Ping?`
                    }]
                }
                interaction.createMessage(ping) 
            default: { 
                return interaction.createMessage('interaction received')
            }
        }
    }
})