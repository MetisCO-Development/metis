import {Command} from "../../Core/Structures/Command"; 
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";
import {inspect} from "util"; 
import { eventNames } from "process";

class Eval extends Command { 
    constructor(){ 
        super({
            name: 'eval', 
            description: 'Evaluates code.', 
            usage: '<code>', 
            example: 'metis.guilds.size', 
            permLevel: CommandPermissions['developer'], 
            requiredGuilds: [], 
            requiredUsers: [], 
            showOnHelp: false, 
            deleteOnUsage: false, 
            aliases: ['evaluate', 'runcodefortheboys', 'e']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext) { 
        let msgArray: Array<string> = []
        let output: any 
        if (!output) {output = undefined}
        try { 
            output = await eval(ctx.args.join(' '))
            output = inspect(output, {depth:0})
        } catch(error){
            output = error
        }

        msgArray = msgArray.concat(metis.util.splitMessage(output, 1990))
        for(const msg of msgArray){
            ctx.channel.createMessage({
                embed: { 
                    color: metis.colors.default, 
                    author: { 
                        name: 'Eval Results', 
                        icon_url: ctx.member.avatarURL
                    }, 
                    timestamp: new Date(),
                    description: metis.util.formatCode(msg.toString().replace(metis.client.token, '[]'))
                }
            })
        }
    }
}
module.exports.cmd = Eval