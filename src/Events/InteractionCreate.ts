import {CommandInteraction, Interaction} from "eris";
import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 
import {inspect} from "util"; 

metis.client.on('interactionCreate', async (interaction: Interaction, args: Array<string>) => { 
    if(interaction instanceof CommandInteraction){
        switch(interaction.data.name) { 
            
            // ping command
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

               case "eval": 
                let msgArray: Array<string> = []
                const code = args.join(" "); 
                let evaled = await eval(code);
                if (typeof evaled !== "string")
                    evaled = inspect(evaled, {depth: 0});
                
                msgArray = msgArray.concat(metis.util.splitMessage(evaled, 1990))
                
                for (const msg of msgArray){
                    interaction.channel.createMessage({
                        embed: {
                            author: { name: 'Eval Results', icon_url: interaction.user.avatarURL },
                            description: "```js\n" + evaled + "```",
                            color: metis.colors.blue,
                            timestamp: new Date(),
                    }
                    }).catch((err) => { 
                        interaction.channel.createMessage({
                            embed: { 
                            author: { name: 'Eval Results', icon_url: interaction.user.avatarURL },
                            description: "```js\n" + err + "```",
                            color: metis.colors.blue,
                            timestamp: new Date(),
                            }
                        })
                    })
                }
            // new commands
        }
    }
})