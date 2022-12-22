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
               await interaction.createMessage(ping).then(() => { 
                   return interaction.editOriginalMessage({
                        embeds: [{
                            color: metis.colors.blue, 
                            description: `${metis.emotes.info} Ping! \`${Date.now() - now}ms\``
                        }]
                    })
               })
        }
    }
})