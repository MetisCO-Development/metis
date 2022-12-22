"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
const child_process_1 = require("child_process");
class Build extends Command_1.Command {
    constructor() {
        super({
            name: "update",
            module: 'Dev',
            description: "Executes a console command",
            usage: "[command]",
            example: "pm2 restart metis",
            permLevel: types_1.CommandPermissions["developer"],
            requiredUsers: [],
            requiredGuilds: [],
            showOnHelp: false,
            deleteOnUsage: false,
            enabled: true,
            aliases: ["ex"]
        });
    }
    async execute(metis, ctx) {
        let msgArray = [];
        let output;
        if (!ctx.args.length) {
            return this.error(ctx.channel, 'No content was provided');
        }
        (0, child_process_1.exec)(ctx.args.join(' '), (error, out) => {
            if (error) {
                output = error;
            }
            if (!error) {
                output = out;
            }
            msgArray = msgArray.concat(metis.util.splitMessage(output, 1990));
            for (const msg of msgArray) {
                ctx.channel.createMessage({
                    embed: {
                        author: { name: 'Exec Results', icon_url: ctx.user.avatarURL },
                        description: metis.util.formatCode(msg.toString()),
                        color: metis.colors.blue,
                        timestamp: new Date(),
                    }
                });
            }
        });
    }
}
module.exports.cmd = Build;
