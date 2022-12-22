import {Command} from "../../Core/Structures/Command";
import {ICommandContext, CommandPermissions, MetisInterface} from "../../types"; 
import {exec} from "child_process";

class Exec extends Command {
    constructor(){
        super({
            name: "exec",
            module: 'Dev',
            description: "Executes a console command",
            usage: "[command]",
            example: "pm2 restart metis",
            permLevel: CommandPermissions["developer"],
            requiredUsers: [],
            requiredGuilds: [],
            showOnHelp: false,
            deleteOnUsage: false,
            enabled: true,
            aliases: ["ex"]
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        let msgArray: Array<string> = []
        let output: any 
        if (!ctx.args.length){return this.error(ctx.channel, 'No content was provided')}
        exec(ctx.args.join(' '), (error, out) => { 
            if(error){output = error}
            if(!error){output = out}

            msgArray = msgArray.concat(metis.util.splitMessage(output, 1990))

            for(const msg of msgArray){
                ctx.channel.createMessage({
                    embed: { 
                        author: { name: 'Exec Results', icon_url: ctx.user.avatarURL },
                        description: metis.util.formatCode(msg.toString()),
                        color: metis.colors.blue,
                        timestamp: new Date(),
                    }
                })
            }
        })
    }
}

module.exports.cmd = Exec;