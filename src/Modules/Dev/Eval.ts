import {Command} from "../../Core/Structures/Command"; 
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";
import {inspect} from "util"; 

class Eval extends Command { 
    constructor(){ 
        super({
            name: 'eval', 
            module: 'Dev',
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
        const code = ctx.args.join(" "); 
        let evaled = await eval(code);
        if (typeof evaled !== "string")
            evaled = inspect(evaled, {depth: 0});
      
        msgArray = msgArray.concat(metis.util.splitMessage(evaled, 1990))
        
        for (const msg of msgArray){
            ctx.channel.createMessage({
                embed: {
                    author: { name: 'Eval Results', icon_url: ctx.user.avatarURL },
                    description: metis.util.formatCode(msg.toString()),
                    color: metis.colors.blue,
                    timestamp: new Date(),
           }
            }).catch((err) => { 
                ctx.channel.createMessage({
                    embed: { 
                        author: { name: 'Eval Results', icon_url: ctx.user.avatarURL },
                        description: metis.util.formatCode(msg.toString()),
                        color: metis.colors.blue,
                        timestamp: new Date(),
                    }
                })
            })
        }
        
     }
}
module.exports.cmd = Eval