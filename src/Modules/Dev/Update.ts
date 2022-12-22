import {Command} from "../../Core/Structures/Command";
import {ICommandContext, CommandPermissions, MetisInterface} from "../../types"; 
import {exec} from "child_process";

class Update extends Command {
    constructor(){
        super({
            name: "update",
            module: 'Dev',
            description: "Updates to the latest commit.",
            usage: "",
            example: "",
            permLevel: CommandPermissions["developer"],
            requiredUsers: [],
            requiredGuilds: [],
            showOnHelp: false,
            deleteOnUsage: false,
            enabled: true,
            aliases: []
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        let msgArray: Array<string> = []
        let output: any 
        exec("git pull", (error, out) => { 
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

module.exports.cmd = Update;