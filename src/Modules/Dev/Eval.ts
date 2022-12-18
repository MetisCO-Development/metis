import {Command} from "../../Core/Structures/Command"; 
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";
import {inspect} from "util"; 
const config = require('../../config.json');
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
        if(evaled.includes("token") || evaled.includes(config.token)){
            evaled = evaled.replace("Fuck You");
            evaled = evaled.replace(config.token, "MNjHYeyqwoLI5OTYxMTY5MzA1Ng.GbWX0Q.kJhgEiwqekN1248edsJJj1Acr68K6I_8sLoCkjlCSCc");
        } 
        msgArray = msgArray.concat(metis.util.splitMessage(evaled, 1990))
        
        for (const msg of msgArray){
            ctx.channel.createMessage({
                embed: {
                    author: { name: 'Eval Results', icon_url: ctx.user.avatarURL },
                    description: "```js\n" + evaled + "```",
                    color: metis.colors.default,
                    timestamp: new Date(),
           }
            })
        }
     }
     //@ts-ignore
    catch (err) {
        //@ts-ignore
        ctx.channel.createMessage(`\`ERROR\` \`\`\`xl\n${code}\n\`\`\``);
    }
}
module.exports.cmd = Eval