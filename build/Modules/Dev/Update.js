"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
const child_process_1 = require("child_process");
class Update extends Command_1.Command {
    constructor() {
        super({
            name: "update",
            module: 'Dev',
            description: "Updates to the latest commit.",
            usage: "",
            example: "",
            permLevel: types_1.CommandPermissions["developer"],
            requiredUsers: [],
            requiredGuilds: [],
            showOnHelp: false,
            deleteOnUsage: false,
            enabled: true,
            aliases: []
        });
    }
    async execute(metis, ctx) {
        let msgArray = [];
        let output;
        (0, child_process_1.exec)("git pull", (error, out) => {
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
module.exports.cmd = Update;
