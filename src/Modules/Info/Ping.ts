import {Command} from "../../Core/Structures/Command"; 
import { CommandPermissions, ICommandContext, MetisInterface } from "../../types";

class Ping extends Command { 
    constructor(){
        super({
            name: 'ping', 
            module: 'Info',
            description: 'Displays current bot latency.', 
            usage: '', 
            example: '', 
            permLevel: CommandPermissions['user'], 
            requiredUsers: [], 
            requiredGuilds: [], 
            deleteOnUsage: false, 
            showOnHelp: true, 
            enabled: true, 
            aliases: ['pong']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext) { 
        const originalTime = Date.now()
        return ctx.channel.createMessage({
            embed: { 
                description: `${metis.emotes.info} Ping?`, 
                color: metis.colors.default 
            }
        }).then(message => { 
            return message.edit({
                embed: {
                    description: `${metis.emotes.info} Pong! \`${Date.now() - originalTime}ms\``, 
                    color: metis.colors.default
                }
            })
        }).catch(() => undefined)
    }
}

module.exports.cmd = Ping